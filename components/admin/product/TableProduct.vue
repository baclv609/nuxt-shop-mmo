<script setup>
import { ref, onMounted } from 'vue';
import { useProductStore } from '~/stores/product';
import { message } from 'ant-design-vue';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons-vue';

const productStore = useProductStore();
const searchText = ref('');

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    width: 80,
  },
  {
    title: 'Hình ảnh',
    dataIndex: 'image_url',
    width: 100,
  },
  {
    title: 'Tên sản phẩm',
    dataIndex: 'name',
    sorter: (a, b) => a.name.localeCompare(b.name),
  },
  {
    title: 'Giá gốc',
    dataIndex: 'original_price',
    width: 120,
  },
  {
    title: 'Giá khuyến mãi',
    dataIndex: 'discount_price',
    width: 120,
  },
  {
    title: 'Hot',
    dataIndex: 'hot',
    width: 80,
  },
  {
    title: 'Thao tác',
    key: 'action',
    width: 120,
    fixed: 'right',
  },
];

const handleDelete = async (id) => {
  try {
    await productStore.deleteProduct(id);
    message.success('Xóa sản phẩm thành công');
  } catch (error) {
    message.error('Có lỗi xảy ra khi xóa sản phẩm');
  }
};

onMounted(async () => {
  try {
    await productStore.fetchProducts();
  } catch (error) {
    message.error('Không thể tải danh sách sản phẩm');
  }
});
const onSearch = () => {
  productStore.searchProducts(searchText.value);
};

defineEmits(['edit']);
</script>

<template>
  <div>
    <div class="mb-4">
      <a-input-search v-model:value="searchText" placeholder="Tìm kiếm sản phẩm..." style="width: 300px"
        @search="onSearch" />
    </div>

    <a-table :columns="columns" :data-source="productStore.products" :loading="productStore.loading" row-key="id"
      :pagination="{
        total: productStore.products.length,
        pageSize: 10,
        showSizeChanger: true,
        showTotal: (total) => `Tổng ${total} sản phẩm`,
      }">
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'image_url'">
          <img :src="record.image_url" :alt="record.name" class="w-16 h-16 object-cover rounded" />
        </template>

        <template v-else-if="column.dataIndex === 'hot'">
          <a-tag :color="record.hot ? 'red' : 'default'">
            {{ record.hot ? 'Hot' : 'Normal' }}
          </a-tag>
        </template>

        <template v-else-if="column.key === 'action'">
          <div class="flex gap-2">
            <a-tooltip title="Sửa">
              <a-button type="primary" size="small" @click="$emit('edit', record)">
                <template #icon>
                  <EditOutlined />
                </template>
              </a-button>
            </a-tooltip>
            <a-tooltip title="Xóa">
              <a-popconfirm title="Bạn có chắc chắn muốn xóa sản phẩm này?" @confirm="handleDelete(record.id)">
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
  </div>
</template>