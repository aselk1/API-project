import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import AddSongForm from "./AddSongForm";
import "./AddSongForm.css";

function AddSongFormModal() {
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
          <AddSongForm setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  );
}

export default AddSongFormModal;
