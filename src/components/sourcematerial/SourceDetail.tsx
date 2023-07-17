import React, { useState, forwardRef, useImperativeHandle, useEffect } from 'react';
import { Upload, Modal, Tag, Table, Space, Button, Popconfirm, message } from 'antd';
// import Videosource from './videosource';
import { QuestionCircleOutlined } from '@ant-design/icons';
import type { UploadFile } from 'antd/es/upload/interface';
import type { RcFile, UploadProps } from 'antd/es/upload';
import type { ColumnsType } from 'antd/es/table';
import Paginationcom from '../../components/Paginationcom';
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
        // useEffect(() => {
        //   form.setFieldsValue({...recordobject})
        // }, [recordobject])
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