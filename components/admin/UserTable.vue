<script setup>
import { ref, computed, onMounted } from "vue";
import { message, Modal } from "ant-design-vue";

// Tạo dữ liệu mẫu
const allUsers = ref(
  Array.from({ length: 53 }, (_, i) => ({
    _id: `user_${i + 1}`,
    username: `user${i + 1}`,
    email: `user${i + 1}@example.com`,
    role: i % 3 === 0 ? "admin" : "user",
    status: i % 5 === 0 ? "blocked" : "active",
    createdAt: new Date(Date.now() - i * 86400000).toISOString(),
  }))
);

const currentPage = ref(1);
const pageSize = ref(10);
const keyword = ref("");

// Tính toán dữ liệu hiển thị theo trang và tìm kiếm
const filteredUsers = computed(() => {
  return allUsers.value.filter(
    (user) =>
      user.username.toLowerCase().includes(keyword.value.toLowerCase()) ||
      user.email.toLowerCase().includes(keyword.value.toLowerCase())
  );
});

const pagedUsers = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  return filteredUsers.value.slice(start, start + pageSize.value);
});

const total = computed(() => filteredUsers.value.length);

const handleDelete = (id) => {
  Modal.confirm({
    title: "Xác nhận xoá người dùng?",
    onOk: () => {
      allUsers.value = allUsers.value.filter((user) => user._id !== id);
      message.success("Đã xoá người dùng");
    },
  });
};
</script>

<template>
  <div class="bg-white rounded-2xl shadow p-4">
    <div class="flex justify-between mb-4">
      <a-input
        v-model:value="keyword"
        placeholder="Tìm theo tên hoặc email"
        style="max-width: 300px"
      />
      <a-button type="primary" @click="currentPage = 1">Tìm kiếm</a-button>
    </div>

    <a-table
      :columns="[
        { title: 'Username', dataIndex: 'username', key: 'username' },
        { title: 'Email', dataIndex: 'email', key: 'email' },
        { title: 'Role', dataIndex: 'role', key: 'role' },
        { title: 'Status', dataIndex: 'status', key: 'status' },
        {
          title: 'Ngày tạo',
          dataIndex: 'createdAt',
          key: 'createdAt',
          customRender: ({ text }) => new Date(text).toLocaleDateString('vi-VN'),
        },
        {
          title: 'Hành động',
          key: 'actions',
          customRender: ({ record }) =>
            h('div', { class: 'flex gap-2' }, [
              h(
                'a-button',
                {
                  type: 'link',
                  size: 'small',
                  onClick: () => message.info(`Sửa ${record.username}`),
                },
                'Sửa'
              ),
              h(
                'a-button',
                {
                  type: 'link',
                  size: 'small',
                  danger: true,
                  onClick: () => handleDelete(record._id),
                },
                'Xoá'
              ),
            ]),
        },
      ]"
      :data-source="pagedUsers"
      :pagination="false"
      :loading="false"
      rowKey="_id"
    />

    <div class="mt-4 text-right">
      <a-pagination
        :current="currentPage"
        :page-size="pageSize"
        :total="total"
        @change="
          (page) => {
            currentPage = page;
          }
        "
      />
    </div>
  </div>
</template>
