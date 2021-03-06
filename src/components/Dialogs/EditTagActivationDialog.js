import React, {useState} from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from "@material-ui/core/TextField";
import {putOneTag} from "../../services/omgServer";

export default function EditTagActivationDialog(props) {

    const roundTo5Minutes = (date) => {
        let coeff = 1000 * 60 * 5;
        return new Date(Math.round(date.getTime() / coeff) * coeff);
    }

    const getDatePickerFormat = (date) => {
        let initDate = roundTo5Minutes(date);
        initDate.setUTCHours(initDate.getUTCHours() - initDate.getTimezoneOffset() / 60);
        return initDate.toISOString().substr(0, 16);
    }

    const [open, setOpen] = React.useState(false);
    const [tagName, setTagName] = useState(props.tagName);
    const [tagDatetime, setTagDatetime] = useState(getDatePickerFormat(new Date(props.tagDatetime)));
    const [tagId] = useState(props.tagId);

    const editTagActivationNameInputChange = (event) => {
        setTagName(event.target.value);
    }

    const editTagActivationDatetimeChange = (event) => {
        setTagDatetime(getDatePickerFormat(new Date(event.target.value)));
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        document.getElementById("editTagActivationResultRequestTag").innerText = '';
        refreshPage();
    };

    const applyChanges = () => {
        console.log(tagName + "  " + tagId + "  " + new Date(tagDatetime));
        putOneTag(tagName, tagId, tagDatetime).then((res) => {
            document.getElementById("editTagActivationResultRequestTag").innerText = res;
        })
    }

    const refreshPage = () => {
        window.location.reload(false);
    }


    return (
        <div>
            <button type={"button"} className={"btn btn-warning"} onClick={handleClickOpen}>
                <span className={"icon text-white mr-2"}>
                    <i className={"fas fa-edit"}/>
                </span>
                <span className={"text"}>
                    Edit
                </span>
            </button>
            {/*<button className={"btn btn-warning"} onClick={handleClickOpen}>*/}
            {/*    Edit*/}
            {/*</button>*/}
            <Dialog open={open} onClose={handleClose} aria-labelledby="editTagActivation-dialog-title">
                <DialogTitle id="editTagActivationDialogTitle" className={"text-warning pb-0"}>Edit Tag</DialogTitle>
                <DialogContent className={"ml-2 mr-2"}>
                    <div className="row form-group mt-2">
                        <label className={"form-check-label"} htmlFor="editTagActivationNameInput">Name</label>
                        <input type="text" className={"form-control"} id="editTagActivationNameInput" value={tagName} onChange={editTagActivationNameInputChange}/>
                        <div className={"invalid-feedback"}>You have to enter a tag name</div>
                    </div>
                    <div className="row form-group mt-2">
                        <label className={"form-check-label"} htmlFor="editTagActivationDatetime">Activation datetime</label>
                        <TextField
                            value={tagDatetime}
                            onChange={editTagActivationDatetimeChange}
                            id="editTagActivationDatetime"
                            type="datetime-local"
                            className={"w-100 rounded"}
                        />
                    </div>
                    <div className="d-flex row form-group mt-2">
                        <div id={"editTagActivationResultRequestTag"} className={"text-center text-info"}/>
                    </div>
                </DialogContent>
                <DialogActions>
                    <button id={"editTagActivationApplyButton"} onClick={applyChanges} className={"btn text-warning ml-0"}>
                        Apply
                    </button>
                    <button onClick={handleClose} className={"btn text-primary"}>
                        Close
                    </button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
