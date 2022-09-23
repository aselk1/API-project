import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import AddSongToPlaylistForm from "./AddSongToPlaylistForm";
import "./AddSongToPlaylistForm.css";
import * as songDetailsActions from "../../store/songDetails";
import { useDispatch } from "react-redux";

function AddSongToPlaylistFormModal(songId) {
  const [showModal, setShowModal] = useState(false);


  return (
    <div className="addContainer">
      <button
        className="button"
        id="openAddSongToPlaylist"
        onClick={() => setShowModal(true)}
      >
        <i className="fa-solid fa-plus"></i>
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <AddSongToPlaylistForm setShowModal={setShowModal} songId={songId} />
        </Modal>
      )}
    </div>
  );
}

export default AddSongToPlaylistFormModal;
