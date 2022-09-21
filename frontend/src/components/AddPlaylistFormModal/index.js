import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import AddPlaylistForm from "./AddPlaylistForm";
import "./AddPlaylistForm.css";

function AddPlaylistFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        className="button"
        id="openAddSong"
        onClick={() => setShowModal(true)}
      >
        <i className="fa-solid fa-plus"></i>
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <AddPlaylistForm setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  );
}

export default AddPlaylistFormModal;
