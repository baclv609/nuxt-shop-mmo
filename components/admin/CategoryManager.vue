<template>
  <div class="category-manager">
    <!-- Header -->
    <div class="flex justify-between items-center mb-2">
      <div>
        <h2 class="text-xl font-semibold">Quản lý danh mục</h2>
      </div>
      <a-button type="primary" @click="showModal">
        <template #icon>
          <PlusOutlined />
        </template>
        Thêm danh mục
      </a-button>
    </div>

    <!-- Search and Filter -->
    <div class="mb-4 flex gap-4">
      <a-input-search v-model:value="searchText" placeholder="Tìm kiếm danh mục..." style="width: 300px"
        @search="onSearch" />
    </div>

    <!-- Table -->
    <a-table :columns="columns" :data-source="filteredCategories" :loading="categoryStore.loading" row-key="id"
      :pagination="{
        total: filteredCategories.length,
        pageSize: 10,
        showSizeChanger: true,
        showTotal: (total) => `Tổng ${total} danh mục`
      }">
      <!-- Customize columns -->
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <div class="flex gap-2">
            <a-tooltip title="Sửa">
              <a-button type="primary" size="small" @click="handleEdit(record)">
                <template #icon>
                  <EditOutlined />
                </template>
              </a-button>
            </a-tooltip>
            <a-tooltip title="Xóa">
              <a-popconfirm title="Bạn có chắc chắn muốn xóa danh mục này?" @confirm="handleDelete(record.id)">
                <a-button type="primary" danger size="small">
                  <template #icon>
                    <DeleteOutlined />
                  </template>
                </a-button>
              </a-popconfirm>
            </a-tooltip>
          </div>
        </template>
      </template>
    </a-table>

    <!-- Modal Form -->
    <a-modal :open="modalVisible" :title="isEditing ? 'Sửa danh mục' : 'Thêm danh mục mới'" @ok="handleSubmit"
      :confirmLoading="categoryStore.loading" @cancel="resetForm">
      <a-form :model="formState" :rules="rules" ref="formRef" layout="vertical">
        <a-form-item label="Tên danh mục" name="name">
          <a-input v-model:value="formState.name" placeholder="Nhập tên danh mục" :maxLength="100" show-count />
        </a-form-item>

        <a-form-item label="Mô tả" name="description">
          <a-textarea v-model:value="formState.description" placeholder="Nhập mô tả danh mục" :rows="4" :maxLength="500"
            show-count />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { message } from 'ant-design-vue';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons-vue';
import { useCategoryStore } from '~/stores/category';

const categoryStore = useCategoryStore();
const modalVisible = ref(false);
const isEditing = ref(false);
const formRef = ref();
const searchText = ref('');

// Remove unused refs and computed properties
const formState = ref({
  id: null,
  name: '',
  description: '',
});

const rules = {
  name: [
    { required: true, message: 'Vui lòng nhập tên danh mục' },
    { min: 2, message: 'Tên danh mục phải có ít nhất 2 ký tự' },
    { max: 100, message: 'Tên danh mục không được quá 100 ký tự' }
  ],
  description: [
    { max: 500, message: 'Mô tả không được quá 500 ký tự' }
  ]
};

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    width: 80,
  },
  {
    title: 'Tên danh mục',
    dataIndex: 'name',
    key: 'name',
    sorter: (a, b) => a.name.localeCompare(b.name),
  },
  {
    title: 'Mô tả',
    dataIndex: 'description',
    key: 'description',
    ellipsis: true,
  },
  {
    title: 'Thao tác',
    key: 'action',
    width: 120,
    fixed: 'right',
  },
];

const onSearch = (value) => {
  console.log('Search value:', value)
}


// First, let's modify the filteredCategories computed property
const filteredCategories = computed(() => {
  try {
    // console.log('Store categories:', categoryStore.getCategories);
    
    // Ensure we're getting an array
    const categories = Array.isArray(categoryStore.getCategories) 
      ? categoryStore.getCategories 
      : [];
      
    if (!categories.length) {
      console.log('No categories found');
      return [];
    }

    if (!searchText.value) {
      return categories;
    }

    return categories.filter(cat =>
      cat.name.toLowerCase().includes(searchText.value.toLowerCase()) ||
      (cat.description || '').toLowerCase().includes(searchText.value.toLowerCase())
    );
  } catch (error) {
    console.error('Error in filteredCategories:', error);
    return [];
  }
});

// Also modify the onMounted to include debug logging
onMounted(async () => {
  try {
    await categoryStore.fetchCategories();
  } catch (error) {
    console.error('Mount error:', error);
    message.error('Không thể tải danh sách danh mục');
  }
});

// Simplified form handling
const resetForm = () => {
  formRef.value?.resetFields();
  formState.value = {
    id: null,
    name: '',
    description: '',
  };
};

const showModal = () => {
  isEditing.value = false;
  resetForm();
  modalVisible.value = true;
};

const handleEdit = (record) => {
  isEditing.value = true;
  formState.value = {
    id: record.id,
    name: record.name,
    description: record.description || '',
  };
  modalVisible.value = true;
};

const handleSubmit = async () => {
  try {
    await formRef.value.validate();
    const categoryData = {
      name: formState.value.name,
      description: formState.value.description,
    };

    if (isEditing.value && formState.value.id) {
      await categoryStore.updateCategory(formState.value.id, categoryData);
      message.success('Cập nhật danh mục thành công');
    } else {
      await categoryStore.createCategory(categoryData);
      message.success('Thêm danh mục thành công');
    }

    modalVisible.value = false;
    resetForm();
  } catch (error) {
    console.error('Submit error:', error);
    message.error(error.message || 'Có lỗi xảy ra');
  }
};
const handleDelete = async (id) => {
  try {
    await categoryStore.deleteCategory(id);
    message.success('Xóa danh mục	thanh cong');
  } catch (error) {
    console.error('Delete error:', error);
    message.error(error.message || 'Có lỗi xảy ra');
  }
};
</script>

<style scoped>
.category-manager {
  background: white;
  border-radius: 8px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}
</style>