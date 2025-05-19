<script setup>
import { ref, watch } from "vue";
import { useProductStore } from "~/stores/product";
import { message } from "ant-design-vue";
import { PlusOutlined } from "@ant-design/icons-vue";
import dayjs from "dayjs";

import { uploadToCloudinary } from "~/utils/uploadToCloudinary";

const props = defineProps({
  visible: Boolean,
  isEditing: Boolean,
  product: Object,
});

const emit = defineEmits(["update:visible", "close"]);

const productStore = useProductStore();
const formRef = ref();
const loading = ref(false);
const fileList = ref([]);

const formState = ref({
  name: "",
  description: "",
  original_price: "0",
  discount_price: "0",
  flash_sale_price: null,
  flash_sale_start: null,
  flash_sale_end: null,
  image_url: "",
  alt_text: "",
  meta_title: "",
  meta_description: "",
  is_free: 0,
  hot: false,
  view_count: 0,
  category_id: undefined,
  download_link: "",
});

const rules = {
  name: [
    { required: true, message: "Vui lòng nhập tên sản phẩm" },
    { min: 3, message: "Tên sản phẩm phải có ít nhất 3 ký tự" },
  ],
  original_price: [{ required: true, message: "Vui lòng nhập giá gốc" }],
  category_id: [{ required: true, message: "Vui lòng chọn danh mục" }],
  download_link: [
    { required: true, message: "Vui lòng nhập link tải" },
    { type: "url", message: "Link tải không hợp lệ" },
  ],
};

watch(
  () => props.product,
  (newProduct) => {
    console.log("newProduct", newProduct);
    if (newProduct) {
      formState.value = { ...newProduct };
      if (newProduct.image_url) {
        fileList.value = [
          {
            uid: "-1",
            name: "image.png",
            status: "done",
            url: newProduct.image_url,
          },
        ];
      }
    } else {
      resetForm();
    }
  },
  { deep: true }
);

const resetForm = () => {
  formState.value = {
    name: "",
    description: "",
    original_price: "0",
    discount_price: "0",
    flash_sale_price: null,
    flash_sale_start: null,
    flash_sale_end: null,
    image_url: "",
    alt_text: "",
    meta_title: "",
    meta_description: "",
    is_free: 0,
    hot: false,
    view_count: 0,
    category_id: undefined,
    download_link: "",
  };
  fileList.value = [];
  formRef.value?.resetFields();
};
const formatDatetime = (isoString) => {
  return isoString ? dayjs(isoString).format('YYYY-MM-DD HH:mm:ss') : null;
};
const handleSubmit = async () => {
  try {
    await formRef.value.validate();
    loading.value = true;

    const submitData = {
      ...formState.value,
      is_free: Boolean(formState.value.is_free),
      hot: Boolean(formState.value.hot),

      // created_at: formatDatetime(formState.value.created_at),
      // updated_at: formatDatetime(formState.value.updated_at),
      // flash_sale_start: formatDatetime(formState.value.flash_sale_start),
      // flash_sale_end: formatDatetime(formState.value.flash_sale_end),

      image_url: fileList.value.length > 0 ? fileList.value[0].url : "",
      view_count: Number(formState.value.view_count),
      category_id: Number(formState.value.category_id),

    };

    if (props.isEditing) {
      await productStore.updateProduct(props.product.id, submitData);
      message.success("Cập nhật sản phẩm thành công");
    } else {
      await productStore.createProduct(submitData);
      message.success("Thêm sản phẩm thành công");
    }

    emit("update:visible", false);
    emit("close");
    resetForm();
  } catch (error) {
    message.error(error.message || "Có lỗi xảy ra");
  } finally {
    loading.value = false;
  }
};

const handleImageChange = async (info) => {
  const file = info.file.originFileObj;
  if (!file) return;
  console.log('Received file:', file);

  try {
    loading.value = true;
    console.log('Starting upload for file:', file.name);
    
    const imageUrl = await uploadToCloudinary(file);
    console.log('Upload successful, image URL:', imageUrl);

    fileList.value = [
      {
        uid: Date.now().toString(),
        name: file.name,
        status: "done",
        url: imageUrl,
      },
    ];

    formState.value.image_url = imageUrl;
    message.success("Tải ảnh lên thành công");
  } catch (err) {
    console.error('Upload failed:', err);
    message.error(err.message || "Tải ảnh lên thất bại");
    fileList.value = [];
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <a-modal :open="visible" :title="isEditing ? 'Sửa sản phẩm' : 'Thêm sản phẩm mới'" @ok="handleSubmit"
    @cancel="$emit('update:visible', false)" :confirmLoading="loading" width="900px">
    <a-form ref="formRef" :model="formState" :rules="rules" layout="vertical">
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="Tên sản phẩm" name="name">
            <a-input v-model:value="formState.name" />
          </a-form-item>

          <a-form-item label="Danh mục" name="category_id">
            <a-select v-model:value="formState.category_id" placeholder="Chọn danh mục">
              <a-select-option :value="1">ROM</a-select-option>
              <a-select-option :value="2">Tool</a-select-option>
            </a-select>
          </a-form-item>

          <a-form-item label="Giá gốc" name="original_price">
            <a-input-number v-model:value="formState.original_price" :min="0" style="width: 100%" />
          </a-form-item>

          <a-form-item label="Giá khuyến mãi" name="discount_price">
            <a-input-number v-model:value="formState.discount_price" :min="0" style="width: 100%" />
          </a-form-item>

          <a-form-item label="Link tải" name="download_link">
            <a-input v-model:value="formState.download_link" />
          </a-form-item>

          <a-row :gutter="16">
            <a-col :span="12">
              <a-form-item label="Hot" name="hot">
                <a-switch v-model:checked="formState.hot" />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="Miễn phí" name="is_free">
                <a-switch v-model:checked="formState.is_free" />
              </a-form-item>
            </a-col>
          </a-row>
        </a-col>

        <a-col :span="12">
          <a-form-item label="Flash Sale">
            <a-space direction="vertical" style="width: 100%">
              <a-input-number v-model:value="formState.flash_sale_price" placeholder="Giá flash sale"
                style="width: 100%" />
              <!-- <a-range-picker v-model:value="[formState.flash_sale_start, formState.flash_sale_end]" show-time
                style="width: 100%" /> -->
            </a-space>
          </a-form-item>

          <a-form-item label="Hình ảnh" name="image_url">
            <a-upload v-model:file-list="fileList" list-type="picture-card" :max-count="1" 
              @change="handleImageChange">
              <div v-if="fileList.length < 1">
                <plus-outlined />
                <div style="margin-top: 8px">Tải lên</div>
              </div>
            </a-upload>
          </a-form-item>

          <a-form-item label="Alt text" name="alt_text">
            <a-input v-model:value="formState.alt_text" />
          </a-form-item>

          <a-form-item label="Meta title" name="meta_title">
            <a-input v-model:value="formState.meta_title" />
          </a-form-item>

          <a-form-item label="Meta description" name="meta_description">
            <a-textarea v-model:value="formState.meta_description" :rows="2" />
          </a-form-item>
        </a-col>
      </a-row>

      <a-form-item label="Mô tả" name="description">
        <a-textarea v-model:value="formState.description" :rows="4" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<style scoped>
.ant-upload-select {
  width: 100% !important;
  height: 200px !important;
}
</style>
