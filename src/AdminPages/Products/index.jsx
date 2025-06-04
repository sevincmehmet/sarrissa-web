import * as React from "react";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import { IconPencil, IconPlus, IconTrash } from "@tabler/icons-react";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import Table from "../../component/Table";
import { useMessageBox } from "../../context/MessageBox";
import DescriptionEditor from "../../component/DescriptionEditor";
import MultiImageUploader from "../../component/MultiImageUploader";
import VariantSection from "../../component/VariantSection";
import { generateVariants } from "../../utils/commonMethodts";
import { ProductsData } from "../../Data";
import { useFormik } from "formik";
import * as Yup from "yup";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const categories = [{ name: "Ürün" }, { name: "Varyant" }];

const Index = () => {
  const { openMessageBox } = useMessageBox();
  const [imagesData, setImagesData] = React.useState([]);
  const [descData, setDescData] = React.useState("<p><br></p>");
  const [open, setOpen] = React.useState(false);

  const formik = useFormik({
    initialValues: {
      Name: "",
      Image1: "",
      Image2: "",
      Image3: "",
      Image4: "",
      Image5: "",
      Barcode: "",
      trendyol_salePrice: "",
      Tax: "",
      Stock: "",
      Brand: "",
      mainCategory: "",
      category: "",
      subCategory: "",
      Description: "",
      variants: "",
    },
    validationSchema: Yup.object({
      Name: Yup.string().required("Ürün adı zorunlu"),
      Barcode: Yup.string().required("Barkod girilmeli"),
      trendyol_salePrice: Yup.number()
        .typeError("Fiyat sayı olmalı")
        .required("Fiyat girilmeli"),
      Stock: Yup.number()
        .integer("Stok tam sayı olmalı")
        .min(0, "Negatif stok olamaz")
        .required("Stok girilmeli"),
    }),
    onSubmit: (values, { resetForm }) => {
      resetForm();
    },
  });

  React.useEffect(() => {
    console.log(formik.values);
  }, [formik.values]);

  const tableData = {
    columns: [
      {
        field: "Image1",
        headerName: "Image",
        width: 100,
        renderCell: (params) => (
          <div className="flex items-center justify-center">
            <img
              className="rounded-full flex items-center justify-center w-11 h-11"
              src={`${params.row.Image1}`}
              alt="img"
              width="50"
              height="50"
            />
          </div>
        ),
      },
      //  { field: "Product_id", headerName: "ID", width: 90 },
      { field: "Product_code", headerName: "Product Code", width: 150 },
      { field: "Barcode", headerName: "Barcode", width: 150 },
      { field: "Name", headerName: "Ürün Adı", width: 250 },
      { field: "mainCategory", headerName: "Main Category", width: 200 },
      { field: "category", headerName: "Category", width: 150 },
      {
        field: "trendyol_salePrice",
        headerName: "Fiyat",
        width: 130,
        renderCell: (params) => {
          return (
            <div className="flex items-center justify-center">
              <b className="font-mono">{`${params.row.trendyol_salePrice} ₺`}</b>{" "}
            </div>
          );
        },
      },
      { field: "Stock", headerName: "Stock", width: 100 },
      { field: "Brand", headerName: "Brand", width: 120 },
      {
        field: "variantName",
        headerName: "Varyant adı",
        width: 100,
        renderCell: (params) => {
          console.log({ params });
          const value = params?.row?.variants?.variant[0].spec.name;
          return (
            <div className="flex items-center justify-center">{value}</div>
          );
        },
      },
      {
        field: "Variants",
        headerName: "Varyantlar",
        width: 300,
        renderCell: (params) => {
          console.log({ params });
          const values = params?.row?.variants?.variant;
          return (
            <div className="flex items-center gap-1 truncate">
              {Boolean(values && values.length >= 0) &&
                values.map((oItem, idx) => {
                  console.log(oItem.spec._);

                  return (
                    <div key={idx}>
                      <span className="border border-orange-200 bg-orange-50 text-orange-400 rounded-lg px-3 py-1 truncate">
                        {oItem.spec._}
                      </span>
                    </div>
                  );
                })}
            </div>
          );
        },
      },
    ],
    rows: ProductsData.map((product, index) => ({
      id: index + 1, // opsiyonel: grid için sıra numarası
      ...product,
    })),
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
        <span className="font-semibold text-xl text-orange-500">Ürünler</span>
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 rounded-md border border-orange-300 bg-white px-4 py-2 text-sm font-medium text-orange-500 hover:bg-orange-500 hover:text-white hover:shadow-md transition cursor-pointer"
        >
          <IconPlus size={16} />
          Ürün Ekle
        </button>
      </nav>

      <div className="h-[calc(100vh-7.5rem)]">
        <Table tableData={tableData} menuItems={menuItems} />
      </div>

      <Dialog
        sx={{
          ".MuiPaper-root": {
            borderRadius: "1rem",
            width: "60rem",
            maxWidth: "60rem",
          },
        }}
        open={open}
        onClose={() => setOpen(false)}
        TransitionComponent={Transition}
      >
        <div className="h-full px-6 pt-6 w-full ">
          <div className="mb-4 w-full">
            <TabGroup>
              <div className="flex items-center justify-center w-full">
                <TabList className=" flex gap-2 w-full ">
                  {categories.map(({ name }) => (
                    <Tab
                      key={name}
                      className={({ selected }) =>
                        `rounded-md px-4 py-2 text-sm font-medium w-1/2 cursor-pointer ${
                          selected
                            ? "bg-orange-100 text-orange-600"
                            : "text-orange-500 hover:bg-orange-50"
                        } transition`
                      }
                    >
                      {name}
                    </Tab>
                  ))}
                </TabList>
              </div>

              <TabPanels className="mt-4 overflow-auto max-h-[calc(100vh-20rem)] px-1">
                <TabPanel>
                  <div className="flex flex-col gap-2 mb-2">
                    <label className="text-sm font-medium text-gray-700">
                      Ürün Adı
                    </label>
                    <input
                      type="text"
                      value={formik.values["Name"]}
                      onChange={(e) =>
                        formik.setFieldValue("Name", e.target.value)
                      }
                      placeholder={`örn. `}
                      className="w-full px-4 py-2 rounded-md border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
                    />
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <MultiImageUploader
                      imagesData={imagesData}
                      handleImages={(oParam) => {
                        console.log({ oParam });
                        if (oParam.length === 1) {
                          formik.setFieldValue("");
                        }

                        oParam.forEach((element, idx) => {
                          formik.setFieldValue(
                            `Image${idx + 1}`,
                            element.base64
                          );
                        });
                        setImagesData(oParam);
                      }}
                    />
                    <div className="flex flex-col gap-2 mb-2">
                      <label className="text-sm font-medium text-gray-700">
                        Açıklama
                      </label>
                      <DescriptionEditor
                        descData={descData}
                        handleDesc={(oParam) => {
                          formik.setFieldValue("Description", oParam);
                          setDescData(oParam);
                        }}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { name: "Barcode", label: "Barkod", type: "text" },
                      {
                        name: "trendyol_salePrice",
                        label: "Fiyat",
                        type: "text",
                      },
                      { name: "Tax", label: "Vergi", type: "text" },
                      { name: "Stock", label: "Stok", type: "text" },
                      { name: "brand", label: "Marka", type: "text" },
                    ].map(({ label, type, name }, i) => (
                      <div className="flex flex-col gap-2" key={i}>
                        <label className="text-sm font-medium text-gray-700">
                          {label}
                        </label>
                        <input
                          type={type}
                          value={formik.values[name]}
                          onChange={(e) =>
                            formik.setFieldValue(name, e.target.value)
                          }
                          placeholder={`örn. ${label}`}
                          className="w-full px-4 py-2 rounded-md border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
                        />
                      </div>
                    ))}

                    {[
                      { name: "mainCategory", label: "Ana Kategori" },
                      { name: "category", label: "Kategori" },
                      { name: "subCategory", label: "Alt Kategori" },
                    ].map(({ name, label }, i) => (
                      <div className="flex flex-col gap-2" key={i}>
                        <label className="text-sm font-medium text-gray-700">
                          {label}
                        </label>
                        <select
                          value={formik.values[name]}
                          onChange={(e) =>
                            formik.setFieldValue(name, e.target.value)
                          }
                          className="px-4 py-2 rounded-md border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
                        >
                          <option>Volvo</option>
                          <option>Saab</option>
                          <option>Mercedes</option>
                          <option>Audi</option>
                        </select>
                      </div>
                    ))}
                  </div>
                </TabPanel>
                <TabPanel>
                  <VariantSection
                    onVariantsChange={(data) => {
                      const result = generateVariants(data);
                      formik.setFieldValue("variants", result.variants);
                    }}
                  />
                </TabPanel>
              </TabPanels>
              <div className="mt-4 flex items-center justify-end gap-3">
                <button
                  onClick={() => {
                    setOpen(false);
                    resetForm();
                  }}
                  className=" border border-green-500 text-green-500 hover:text-white font-medium !px-4 !py-1.5 rounded-xl hover:bg-green-500 duration-300 cursor-pointer"
                >
                  Vazgeç
                </button>
                <button className=" bg-green-500 text-white font-medium !px-4 !py-1.5 rounded-xl border border-green-200 hover:bg-green-600 duration-300 cursor-pointer">
                  Ürün Ekle
                </button>
              </div>
            </TabGroup>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default Index;
