import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export const CheckOutModal = ({ showModal, handleClose }) => {
  const classes = useStyles();

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2>Text in a modal</h2>
      <p>
        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
      </p>
      <SimpleModal />
    </div>
  );

  return (
    <Modal
      open={showModal}
      onClose={handleClose}
    >
      {body}
    </Modal>
  )
}