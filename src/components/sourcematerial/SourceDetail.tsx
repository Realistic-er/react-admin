import React, { useState, forwardRef, useImperativeHandle, } from 'react';
import { Modal,} from 'antd';
import '../../style/components/saledetail.module.scss';

interface DataType {
    key: string;
    salername: string;
    salerpart: string;
    saleerinfo: string[];
    salernumber: number;
    email: string;
}
interface arraytype {
    uid: string,
    name: string,
    url: string,
}
const Sourcedetail: React.FC<any> = forwardRef(
    (props, ref) => {
      useImperativeHandle(ref, () => {
        return {
          showModal: showModal,
        };
      });
        const [isModalOpen, setIsModalOpen] = useState(false);
        const showModal = () => {
          setIsModalOpen(true);
        };
      
        const handleOk = () => {
            setIsModalOpen(false);
        };
      
        const handleCancel = () => {
          setIsModalOpen(false);
        };
        const close = () => {
          const video:any = document.getElementById('video');
          if (video !== null) video.pause()
        };
        return (
          <Modal title="详情" open={isModalOpen} footer="" destroyOnClose={true} width="50%"
            onOk={handleOk} onCancel={handleCancel} forceRender afterClose={close}>
                <video
                    id='video'
                    controls
                    src="http://vjs.zencdn.net/v/oceans.mp4">
                </video>
          </Modal>
        );
      }
    
);

Sourcedetail.displayName = 'Sourcedetail';

export default Sourcedetail;