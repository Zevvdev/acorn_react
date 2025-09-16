import React from 'react';
import { Button, Modal, ModalBody } from 'react-bootstrap';

/*
    show 는 boolean type 모달을 띄울지 여부
    message 는 string type 모달 메시지 내용
    onYes는 function type 확인 버튼을 눌렀을 때 실행할 함수
    onCancel 은 function type 취소 버튼을 눌렀을 때 실행할 함수
*/

function ConfirmModal({show, message, onYes, onCancel}) {
    return (
        <Modal show={show}>
            <Modal.Header>알림</Modal.Header>
            <ModalBody>
                {message}
            </ModalBody>
            <Modal.Footer>
                <Button variant='success' onClick={onYes}>확인</Button>
                <Button variant='warning' onClick={onCancel}>취소</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ConfirmModal;