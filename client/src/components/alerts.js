import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import './alerts.css';


class AlertPage extends React.Component {
  notify(type){
    return () => {
      switch (type) {
        case 'info':
          toast.info('Info message', {
            autoClose: 3000
          });
          break;
        case 'success':
          toast.success('Success message', {
            position: toast.POSITION.TOP_RIGHT,
          });
          break;
        case 'warning':
          toast.warn('Warning message', {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
          break;
        case 'error':
          toast.error('Error message');
          break;
      }
    };
  };
  render(){
    console.log(this.props.alert);
    return (
      <div>
        {this.notify(this.props.alert)}
        <ToastContainer
          hideProgressBar={true}
          newestOnTop={true}
          autoClose={5000}
        />
      </div>
    );
  }
}
export default AlertPage;