<script setup>
import { ref, watch, onMounted } from "vue";
import { useProductStore } from "~/stores/product";
import { message } from "ant-design-vue";
import { PlusOutlined, InfoCircleOutlined } from "@ant-design/icons-vue";

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
const selectedFile = ref(null);

const formState = ref({
  name: "",
  description: "",
  original_price: 0,
  discount_price: 0,
  image_url: "",
  alt_text: "",
  meta_title: "",
  meta_description: "",
  is_free: false,
  hot: false,
  view_count: 0,
  purchase_count: 0,
  category_id: undefined,
  download_link: "",
});

const initialFormState = ref(null);

const rules = {
  name: [
    { required: true, message: "Vui lòng nhập tên sản phẩm" },
    { min: 3, message: "Tên sản phẩm phải có ít nhất 3 ký tự" },
  ],
  description: [
    { required: true, message: "Vui lòng nhập mô tả sản phẩm" },
    { min: 10, message: "Mô tả phải có ít nhất 10 ký tự" },
  ],
  original_price: [
    {
      validator: (rule, value) => {
        if (formState.value.is_free) {
          return Promise.resolve();
        }
        if (!value || Number(value) <= 0) {
          return Promise.reject('Giá gốc phải lớn hơn 0');
        }
        return Promise.resolve();
      }
    }
  ],
  discount_price: [
    {
      validator: (rule, value) => {
        if (formState.value.is_free) {
          return Promise.resolve();
        }
        if (value && Number(value) >= Number(formState.value.original_price)) {
          return Promise.reject('Giá khuyến mãi phải nhỏ hơn giá gốc');
        }
        return Promise.resolve();
      }
    }
  ],
  category_id: [{ required: true, message: "Vui lòng chọn danh mục" }],
  download_link: [
    { required: true, message: "Vui lòng nhập link tải" },
    { type: "url", message: "Link tải không hợp lệ" },
  ],
  meta_title: [
    { required: true, message: "Vui lòng nhập meta title" },
    { max: 60, message: "Meta title không được vượt quá 60 ký tự" },
  ],
  meta_description: [
    { required: true, message: "Vui lòng nhập meta description" },
    { max: 160, message: "Meta description không được vượt quá 160 ký tự" },
  ],
};

watch(
  () => props.product,
  (newProduct) => {
    if (newProduct) {
      formState.value = { ...newProduct };
      initialFormState.value = { ...newProduct };
      if (newProduct.image_url) {
        fileList.value = [
          {
            uid: "-1",
            name: "image.png",
            status: "done",
            url: newProduct.image_url,
          },
        ];
        selectedFile.value = null;
      }
    } else {
      resetForm();
    }
  },
  { deep: true }
);

watch(() => formState.value.is_free, (newValue) => {
  if (newValue) {
    formState.value.original_price = 0;
    formState.value.discount_price = null;
  }
});

const resetForm = () => {
  formState.value = {
    name: "",
    description: "",
    original_price: 0,
    discount_price: 0,
    image_url: "",
    alt_text: "",
    meta_title: "",
    meta_description: "",
    is_free: false,
    hot: false,
    view_count: 0,
    purchase_count: 0,
    category_id: undefined,
    download_link: "",
  };
  initialFormState.value = null;
  fileList.value = [];
  selectedFile.value = null;
  formRef.value?.resetFields();
};

const isFormChanged = () => {
  if (!initialFormState.value) {
    const defaultValues = {
      name: "",
      description: "",
      original_price: 0,
      discount_price: 0,
      image_url: "",
      alt_text: "",
      meta_title: "",
      meta_description: "",
      is_free: false,
      hot: false,
      view_count: 0,
      purchase_count: 0,
      category_id: undefined,
      download_link: "",
    };
    return JSON.stringify(formState.value) !== JSON.stringify(defaultValues) || selectedFile.value !== null;
  }

  return JSON.stringify(formState.value) !== JSON.stringify(initialFormState.value) || selectedFile.value !== null;
};

const handleSubmit = async () => {
  try {
    await formRef.value.validate();
    loading.value = true;

    const { created_at, updated_at, ...submitData } = {
      ...formState.value,
      is_free: Boolean(formState.value.is_free),
      hot: Boolean(formState.value.hot),
      alt_text: formState.value.name,
      original_price: Number(formState.value.original_price),
      discount_price: Number(formState.value.discount_price),
      image_url: formState.value.image_url,
      view_count: Number(formState.value.view_count),
      purchase_count: Number(formState.value.purchase_count),
      category_id: Number(formState.value.category_id),
      updated_at: new Date()
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

  if (file.size > 5 * 1024 * 1024) {
    message.error("Kích thước file không được vượt quá 5MB");
    return;
  }

  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
  if (!allowedTypes.includes(file.type)) {
    message.error("Chỉ chấp nhận file ảnh (JPEG, PNG, GIF)");
    return;
  }

  try {
    loading.value = true;
    const imageUrl = await uploadImage(file);

    formState.value.image_url = imageUrl;
    fileList.value = [
      {
        uid: Date.now().toString(),
        name: file.name,
        status: "done",
        url: imageUrl,
      },
    ];

    message.success("Tải ảnh lên thành công");
  } catch (err) {
    console.error('Upload failed:', err);
    message.error(err.message || "Tải ảnh lên thất bại");
    fileList.value = [];
  } finally {
    loading.value = false;
  }
};

const uploadImage = async (file) => {
  const config = useRuntimeConfig();
  const CLOUD_NAME = config.public.CLOUDINARY_CLOUD_NAME;
  const UPLOAD_PRESET = config.public.CLOUDINARY_UPLOAD_PRESET;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);

  const uploadUrl = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

  const res = await fetch(uploadUrl, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    throw new Error("Upload failed");
  }

  const data = await res.json();
  return data.secure_url;
};

const handleCancel = () => {
  if (isFormChanged()) {
    const confirm = window.confirm('Bạn có chắc chắn muốn đóng form? Các thay đổi chưa lưu sẽ bị mất.');
    if (!confirm) return;
  }
  emit("update:visible", false);
  resetForm();
};

const quillOptions = {
  theme: 'snow',
  modules: {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],
      [{ 'header': 1 }, { 'header': 2 }],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'script': 'sub' }, { 'script': 'super' }],
      [{ 'indent': '-1' }, { 'indent': '+1' }],
      [{ 'direction': 'rtl' }],
      [{ 'size': ['small', false, 'large', 'huge'] }],
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'font': [] }],
      [{ 'align': [] }],
      ['clean'],
      ['link', 'image']
    ]
  }
};

const QuillEditor = ref(null);

onMounted(async () => {
  const { QuillEditor: Quill } = await import('@vueup/vue-quill');
  QuillEditor.value = Quill;
  await import('@vueup/vue-quill/dist/vue-quill.snow.css');
});
</script>


<template>
  <a-modal :open="visible" :title="isEditing ? 'Sửa sản phẩm' : 'Thêm sản phẩm mới'" @ok="handleSubmit"
    @cancel="handleCancel" :confirmLoading="loading" width="1000px">
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

          <template v-if="!formState.is_free">
            <a-form-item label="Giá gốc" name="original_price">
              <a-input-number v-model:value="formState.original_price" :min="0" style="width: 100%" />
            </a-form-item>

            <a-form-item label="Giá khuyến mãi" name="discount_price">
              <a-input-number v-model:value="formState.discount_price" :min="0" style="width: 100%" />
            </a-form-item>

            <a-form-item label="Flash Sale">
              <a-space direction="vertical" style="width: 100%">
                <a-input-number v-model:value="formState.flash_sale_price" placeholder="Giá flash sale"
                  style="width: 100%" />
                <a-form-item name="flash_sale_start" style="margin-bottom: 0">
                  <a-date-picker v-model:value="formState.flash_sale_start" show-time placeholder="Thời gian bắt đầu"
                    style="width: 100%" :disabled-date="(current) => current && current < dayjs().startOf('day')" />
                </a-form-item>
                <a-form-item name="flash_sale_end" style="margin-bottom: 0">
                  <a-date-picker v-model:value="formState.flash_sale_end" show-time placeholder="Thời gian kết thúc"
                    style="width: 100%" :disabled-date="(current) => current && current < dayjs().startOf('day')" />
                </a-form-item>
              </a-space>
            </a-form-item>
          </template>

          <a-form-item label="Link tải" name="download_link">
            <a-input v-model:value="formState.download_link" />
          </a-form-item>
        </a-col>

        <a-col :span="12">
          <a-form-item label="Hình ảnh" name="image_url">
            <a-upload v-model:file-list="fileList" list-type="picture-card" :max-count="1" @change="handleImageChange"
              :show-upload-list="true">
              <div v-if="fileList.length < 1">
                <plus-outlined />
                <div style="margin-top: 8px">Tải lên</div>
              </div>
            </a-upload>
          </a-form-item>

          <!-- <a-form-item label="Alt text" name="alt_text">
            <a-input v-model:value="formState.alt_text" />
          </a-form-item> -->

          <a-form-item label="Meta title" name="meta_title">
            <a-input v-model:value="formState.meta_title" />
          </a-form-item>

          <a-form-item label="Meta description" name="meta_description">
            <a-textarea v-model:value="formState.meta_description" :rows="2" />
          </a-form-item>
        </a-col>
      </a-row>

      <a-form-item label="Mô tả" name="description">
        <ClientOnly>
          <QuillEditor v-if="QuillEditor" v-model:content="formState.description" :options="quillOptions"
            contentType="html" toolbar="full" theme="snow" style="height: 200px; margin-bottom: 50px;" />
          <div v-else>Loading editor...</div>
        </ClientOnly>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<style scoped>
.ant-upload-select {
  width: 100% !important;
  height: 200px !important;
}

.ant-upload-list-picture-card .ant-upload-list-item {
  width: 100% !important;
  height: auto !important;
}
</style>
