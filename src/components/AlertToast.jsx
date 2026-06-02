const AlertToast = ({ toastMessage }) => {
  return (
    <div>
      <div className="toast toast-top toast-center">
        <div className="alert alert-success">
          <span>{toastMessage}</span>
        </div>
      </div>
    </div>
  );
};

export default AlertToast;
