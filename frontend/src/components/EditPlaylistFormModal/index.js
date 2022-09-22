import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import EditPlaylistForm from "./EditPlaylistForm";
import "./EditPlaylistForm.css";

function EditPlaylistFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        className="button"
        id="openEditSong"
        onClick={() => setShowModal(true)}
      >
        <i className="fa-regular fa-pen-to-square"></i>
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditPlaylistForm setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  );
}

export default EditPlaylistFormModal;
