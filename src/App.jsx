import { useEffect, useState } from "react";
import axios from "axios";
import { IoMenu } from "react-icons/io5";
import { HiMiniSquares2X2 } from "react-icons/hi2";
import { RiSearch2Line } from "react-icons/ri";
import { MdPersonAddAlt1 } from "react-icons/md";
import Card from "./components/Card";
import Modal from "./components/Modal";

axios.defaults.baseURL = "http://localhost:3000";

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    axios.get("/contact").then((res) => setContacts(res.data));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const text = e.target[1].value;
    const params = {
      q: text,
    };
    axios.get("/contact", { params }).then((res) => setContacts(res.data));
  };
  const handleDelete = (id) => {
    const res = confirm("Kişiyi silmek istediğinizden emin misiniz?");

    if (res) {
      axios.delete(`/contact/${id}`).then(() => {
        const updated = contacts.filter((contact) => contact.id !== id);
        setContacts(updated);
      });
    }
  };
  const handleEdit = (contact) => {
    setEditItem(contact);
    setIsModalOpen(true);
  };

  return (
    <div className="app">
      <header>
        <h1>Rehber</h1>

        <div>
          <form onSubmit={handleSubmit}>
            <button>
              <RiSearch2Line />
            </button>
            <input placeholder="kişi aratın..." type="search" />
          </form>

          <button className="ns">
            <IoMenu />
          </button>

          <button className="ns">
            <HiMiniSquares2X2 />
          </button>

          <button className="add" onClick={() => setIsModalOpen(true)}>
            <MdPersonAddAlt1 />
            <span> Yeni Kişi</span>
          </button>
        </div>
      </header>

      <main>
        {contacts.map((contact) => (
          <Card
            key={contact.id}
            contact={contact}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
        ))}
      </main>

      <Modal
        editItem={editItem}
        isModalOpen={isModalOpen}
        close={() => {
          setIsModalOpen(false);
          setEditItem(null);
        }}
        setContacts={setContacts}
      />
    </div>
  );
};

export default App;
