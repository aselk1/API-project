import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import EditSongForm from "./EditSongForm";
import "./EditSongForm.css";

function EditSongFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        className="button"
        id="openEditSong1"
        onClick={() => setShowModal(true)}
      >
        <i className="fa-regular fa-pen-to-square"></i>
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditSongForm setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  );
}

export default EditSongFormModal;
