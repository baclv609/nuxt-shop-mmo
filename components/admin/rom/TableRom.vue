<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { Drawer, Form, Input, InputNumber, Switch, Select, Button, Table, message } from 'ant-design-vue'
import { slugify } from '@/utils/slugify' // định nghĩa slugify tương tự như trong danh mục
const drawerVisible = ref(false)
const isEditing = ref(false)
const formRef = ref()
const selectedProduct = reactive({
  id: null,
  category_id: null,
  name: '',
  slug: '',
  description: '',
  meta_title: '',
  meta_description: '',
  original_price: 0,
  discount_price: 0,
  hot: false,
  image_url: '',
  alt_text: '',
  main_link: '',
  backup_link: ''
})

// Dữ liệu mẫu (sau này thay bằng API)
const categories = ref([
  { id: 1, name: 'ROM' },
  { id: 2, name: 'TOOL' }
])

const products = ref([
  {
    id: 1,
    category_id: 1,
    name: 'ROM Samsung A50',
    slug: 'rom-samsung-a50',
    description: 'ROM gốc cho Samsung A50',
    meta_title: 'ROM Samsung A50',
    meta_description: 'Tải ROM Samsung A50 chính hãng',
    original_price: 100000,
    discount_price: 75000,
    hot: true,
    image_url: 'https://example.com/a50.jpg',
    alt_text: 'ROM A50',
    main_link: 'https://download.com/a50',
    backup_link: 'https://backup.com/a50'
  }
])

const openDrawer = (record: any = null) => {
  if (record) {
    Object.assign(selectedProduct, record)
    isEditing.value = true
  } else {
    Object.assign(selectedProduct, {
      id: null,
      category_id: null,
      name: '',
      slug: '',
      description: '',
      meta_title: '',
      meta_description: '',
      original_price: 0,
      discount_price: 0,
      hot: false,
      image_url: '',
      alt_text: '',
      main_link: '',
      backup_link: ''
    })
    isEditing.value = false
  }
  drawerVisible.value = true
}

const handleSubmit = () => {
  selectedProduct.slug = slugify(selectedProduct.name)
  if (isEditing.value) {
    const index = products.value.findIndex(p => p.id === selectedProduct.id)
    if (index !== -1) products.value[index] = { ...selectedProduct }
    message.success('Cập nhật sản phẩm thành công')
  } else {
    selectedProduct.id = Date.now()
    products.value.push({ ...selectedProduct })
    message.success('Thêm sản phẩm thành công')
  }
  drawerVisible.value = false
}
</script>

<template>
  <div>
    <a-button type="primary" @click="openDrawer()">Thêm sản phẩm</a-button>
    <a-table :dataSource="products" :columns="[
      { title: 'Tên', dataIndex: 'name' },
      { title: 'Slug', dataIndex: 'slug' },
      { title: 'Giá', dataIndex: 'discount_price' },
      { title: 'Hot', dataIndex: 'hot', customRender: ({ text }) => text ? '🔥' : '❌' },
      {
        title: 'Thao tác', key: 'action', customRender: ({ record }) =>
          h('a', { onClick: () => openDrawer(record) }, 'Sửa')
      }
    ]" rowKey="id" />

    <a-drawer v-model:open="drawerVisible" title="Sản phẩm" placement="left" width="500">
      <a-form layout="vertical" ref="formRef" @submit.prevent="handleSubmit">
        <a-form-item label="Danh mục">
          <a-select v-model:value="selectedProduct.category_id">
            <a-select-option v-for="cat in categories" :key="cat.id" :value="cat.id">{{ cat.name }}</a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item label="Tên sản phẩm">
          <a-input v-model:value="selectedProduct.name" />
        </a-form-item>

        <a-form-item label="Mô tả">
          <a-input.TextArea v-model:value="selectedProduct.description" rows="3" />
        </a-form-item>

        <a-form-item label="Meta Title">
          <a-input v-model:value="selectedProduct.meta_title" />
        </a-form-item>

        <a-form-item label="Meta Description">
          <a-input.TextArea v-model:value="selectedProduct.meta_description" rows="2" />
        </a-form-item>

        <a-form-item label="Giá gốc">
          <a-input-number v-model:value="selectedProduct.original_price" :min="0" style="width: 100%" />
        </a-form-item>

        <a-form-item label="Giá giảm">
          <a-input-number v-model:value="selectedProduct.discount_price" :min="0" style="width: 100%" />
        </a-form-item>

        <a-form-item label="Sản phẩm nổi bật">
          <a-switch v-model:checked="selectedProduct.hot" />
        </a-form-item>

        <a-form-item label="Ảnh sản phẩm (URL)">
          <a-input v-model:value="selectedProduct.image_url" />
        </a-form-item>

        <a-form-item label="Alt ảnh">
          <a-input v-model:value="selectedProduct.alt_text" />
        </a-form-item>

        <a-form-item label="Link chính">
          <a-input v-model:value="selectedProduct.main_link" />
        </a-form-item>

        <a-form-item label="Link dự phòng">
          <a-input v-model:value="selectedProduct.backup_link" />
        </a-form-item>

        <a-form-item>
          <a-button type="primary" html-type="submit">Lưu</a-button>
        </a-form-item>
      </a-form>
    </a-drawer>
  </div>
</template>
