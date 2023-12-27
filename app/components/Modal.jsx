import React from 'react';
import {Modal} from 'antd';

const Modals = ({modalOpen,setModal, children}) => {
 

  const handleOk = () => {
    setModal(false);
  };
  const handleCancel = () => {
    setModal(false);
  };
  return (
    <>
   
      <Modal open={modalOpen} onOk={handleOk} onCancel={handleCancel}>
        {children}
      </Modal>
    </>
  );
}

export default Modals