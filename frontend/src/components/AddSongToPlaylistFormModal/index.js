import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import AddSongToPlaylistForm from "./AddSongToPlaylistForm";
import "./AddSongToPlaylistForm.css";

function AddSongToPlaylistFormModal() {
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
          <AddSongToPlaylistForm setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  );
}

export default AddSongToPlaylistFormModal;
