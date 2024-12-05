import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ShareIcon from "@mui/icons-material/Share";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Snackbar,
} from "@mui/material";
import React, { useState } from "react";
import { useParams } from "react-router-dom";

export default function ShareCourse() {
  const [openShareDialog, setOpenShareDialog] = useState(false);
  const { course_id } = useParams();

  const [copySuccess, setCopySuccess] = useState(false);
  const shareUrl = `${window.location.origin}/course/${course_id}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopySuccess(true);
    });
  };

  return (
    <>
      <IconButton
        edge="end"
        aria-label="share"
        onClick={() => setOpenShareDialog(true)}
      >
        <ShareIcon sx={{ fontSize: 24, color: "black" }} />
      </IconButton>
      <Dialog
        open={openShareDialog}
        onClose={() => setOpenShareDialog(false)}
        aria-labelledby="share-dialog-title"
        aria-describedby="share-dialog-description"
      >
        <DialogTitle id="share-dialog-title">{"Share Course"}</DialogTitle>
        <DialogContent>
          <IconButton
            edge="end"
            aria-label="copy"
            onClick={handleCopyLink}
            sx={{ ml: 1 }}
          >
            <ContentCopyIcon sx={{ fontSize: 24, color: "black" }} />
          </IconButton>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenShareDialog(false)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={copySuccess}
        autoHideDuration={2000}
        onClose={() => setCopySuccess(false)}
        message="Link copied to clipboard"
      />
    </>
  );
}
