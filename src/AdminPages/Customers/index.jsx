import React from "react";
import Table from "../../component/Table";
import { IconPencil, IconPlus, IconTrash } from "@tabler/icons-react";
import { useModal } from "../../hooks/useModal";
import Modal from "../../component/Modal";
import { useMessageBox } from "../../context/MessageBox";
import LocationSelect from '../../component/LocationSelect'
const index = () => {
  const { openMessageBox } = useMessageBox();
  const addUserModal = useModal();

  const tableData = {
    columns: [
      { field: "username", headerName: "Kulanıcı adı", width: 150 },
      { field: "surname", headerName: "SoyAdı", width: 150 },
      { field: "phone", headerName: "Telefon", width: 150 },
      { field: "email", headerName: "E-mail", width: 250 },
      { field: "Adress", headerName: "Şehir", width: 200 },
    ],
    rows: [
      {
        id:'1',
        username: "Mehmet",
        phone: "617363128",
        email: "sajf@gmail.com",
        City: "Sivas",
      },
      {
        id:'2',
        username: "Mehmet",
        phone: "617363128",
        email: "sajf@gmail.com",
        City: "Sivas",
      },
      {
        id:'3',
        username: "Mehmet",
        phone: "617363128",
        email: "sajf@gmail.com",
        City: "Sivas",
      },
    ],
  };

  const handleUpdate = (row) => {
    console.log("Ürünü Güncelle:", row);
  };

  const handleDelete = (row) => {
    console.log("Ürünü Sil:", row);
    openMessageBox(
      `Dikkat`,
      <>
        <b>{row.id}</b>
        {` id' li ürünü silmek istediğinizden emin misiniz?`}
      </>,
      () => {
        alert(`${row.id} id' li kategoriyi sil`);
      },
      () => {
        return; // vazgeçince çalışacak fonksiyon.
      }
    );
  };

  const menuItems = [
    {
      label: (
        <div className="flex items-center text-slate-600/60 group-hover:text-slate-500">
          <IconPencil className="mr-2" size={"1.25rem"} /> Düzenle
        </div>
      ),
      onClick: handleUpdate,
    },
    {
      label: (
        <div className="flex items-center text-slate-600/60 group-hover:text-rose-400">
          <IconTrash className="mr-2" size={"1.25rem"} /> Sil
        </div>
      ),
      onClick: handleDelete,
    },
  ];

  return (
    <>
      <nav className="flex items-center justify-between px-4 py-3 bg-white shadow-sm rounded-md mb-4 h-[62px]">
        <span className="font-semibold text-xl text-orange-500">
          Müşteriler
        </span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            addUserModal.openModal();
          }}
          className="flex items-center gap-2 rounded-md border border-orange-300 bg-white px-4 py-2 text-sm font-medium text-orange-500 hover:bg-orange-500 hover:text-white hover:shadow-md transition cursor-pointer"
        >
          <IconPlus size={16} />
          Kullanıcı Ekle
        </button>
      </nav>

      <div className="h-[calc(100vh-7.5rem)]">
        <Table tableData={tableData} menuItems={menuItems} />
      </div>
      <Modal
        isOpen={addUserModal.isModalOpen}
        title={"Kullanıcı Ekle"}
        onConfirm={() => {}}
        onCancel={() => {
          addUserModal.closeModal();
        }}
      >
      <LocationSelect />


      </Modal>
    </>
  );
};

export default index;
