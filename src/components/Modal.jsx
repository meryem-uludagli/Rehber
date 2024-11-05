import { IoClose } from "react-icons/io5";
import Field from "./Field";
import axios from "axios";
const Modal = ({ isModalOpen, close, setContacts, editItem }) => {
  console.log("DÜZNELENİCEK ELEMAN", editItem);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newContact = Object.fromEntries(formData.entries());
    if (!editItem) {
      axios.post("/contact", newContact).then((res) => {
        setContacts((contacts) => [...contacts, res.data]);
      });
    } else {
      axios.put(`/contact/${editItem.id}`, newContact).then((res) => {
        setContacts((contacts) =>
          contacts.map((contact) =>
            contact.id === editItem.id ? res.data : contact
          )
        );
      });
    }

    close();
  };

  return (
    isModalOpen && (
      <div className="modal">
        <div className="modal-inner">
          <div className="modal-head">
            <h2>{editItem ? "Kişiyi Güncelle" : "Yeni Kişi Ekle"}</h2>
            <button onClick={close}>
              <IoClose />
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <Field value={editItem?.name} label="İsim Soyisim" name="name" />

            <Field
              value={editItem?.position}
              label="Pozisyon"
              name="position"
            />
            <Field value={editItem?.company} label="Şirket" name="company" />
            <Field value={editItem?.phone} label="Telefon" name="phone" />
            <Field value={editItem?.email} label="Mail" name="email" />

            <div className="buttons">
              <button type="button" onClick={close}>
                Vazgeç
              </button>
              <button type="submit">Oluştur</button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default Modal;
