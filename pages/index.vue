<template>
  <div>
    <h1 class="text-3xl font-bold mb-4">Sản phẩm nổi bật 1</h1>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <product-card v-for="product in products" :key="product.id" :product="product" />
    </div>
  </div>
</template>

<script setup>
definePageMeta({ layout: "default" });
// const products = await $fetch("/api/products");
import productCard from "~/components/ProductCard.vue";
const route = useRoute();
const products = [
  {
    id: 106,
    category_id: 1,
    name: "Kệ sách Gỗ Sồi",
    slug: "ke-sach-go-soi",
    description: "Kệ sách bằng gỗ sồi tự nhiên, thiết kế hiện đại, bền đẹp.",
    meta_title: "Kệ sách Gỗ Sồi",
    meta_description: "Sản phẩm kệ sách đẹp, chắc chắn, thiết kế đơn giản phù hợp mọi không gian.",
    original_price: 1800000.00,
    discount_price: 1500000.00,
    hot: false,
    image_url: "https://images.unsplash.com/photo-1580199265076-4a97411a95c7",
    alt_text: "Kệ sách gỗ sồi",
    main_link: "https://example.com/ke-sach-go-soi",
    backup_link: "https://backup.com/ke-sach-go-soi",
    created_at: "2025-05-02 10:24:18",
    updated_at: "2025-05-02 10:24:18"
  },
  {
    id: 107,
    category_id: 1,
    name: "Bàn làm việc gỗ công nghiệp",
    slug: "ban-lam-viec-go-cong-nghiep",
    description: "Bàn làm việc gỗ công nghiệp, thiết kế hiện đại, dễ dàng lắp ráp và di chuyển.",
    meta_title: "Bàn làm việc gỗ công nghiệp",
    meta_description: "Bàn làm việc với thiết kế hiện đại, phù hợp với văn phòng và không gian làm việc tại nhà.",
    original_price: 2500000.00,
    discount_price: 2200000.00,
    hot: false,
    image_url: "https://images.unsplash.com/photo-1589411015725-bb5c0d81e6b1",
    alt_text: "Bàn làm việc gỗ công nghiệp",
    main_link: "https://example.com/ban-lam-viec-go-cong-nghiep",
    backup_link: "https://backup.com/ban-lam-viec-go-cong-nghiep",
    created_at: "2025-05-02 10:24:18",
    updated_at: "2025-05-02 10:24:18"
  },
  {
    id: 108,
    category_id: 2,
    name: "Kệ Tivi Gỗ Mộc",
    slug: "ke-tivi-go-moc",
    description: "Kệ Tivi gỗ mộc tự nhiên, mang đến vẻ đẹp giản dị, gần gũi với thiên nhiên.",
    meta_title: "Kệ Tivi Gỗ Mộc",
    meta_description: "Kệ Tivi gỗ mộc tự nhiên, thiết kế tinh tế, phong cách hiện đại.",
    original_price: 3200000.00,
    discount_price: 2900000.00,
    hot: true,
    image_url: "https://images.unsplash.com/photo-1562364744-d1a83002271f",
    alt_text: "Kệ tivi gỗ mộc",
    main_link: "https://example.com/ke-tivi-go-moc",
    backup_link: "https://backup.com/ke-tivi-go-moc",
    created_at: "2025-05-02 10:24:18",
    updated_at: "2025-05-02 10:24:18"
  },
  {
    id: 109,
    category_id: 1,
    name: "Giường ngủ gỗ tự nhiên",
    slug: "giuong-ngu-go-tu-nhien",
    description: "Giường ngủ gỗ tự nhiên với thiết kế đơn giản, dễ dàng kết hợp với các món đồ nội thất khác.",
    meta_title: "Giường ngủ gỗ tự nhiên",
    meta_description: "Giường ngủ chất lượng cao, gỗ tự nhiên, mang lại cảm giác thư giãn tối đa.",
    original_price: 5000000.00,
    discount_price: 4600000.00,
    hot: true,
    image_url: "https://images.unsplash.com/photo-1600585152913-3e431cf0bb7c",
    alt_text: "Giường ngủ gỗ tự nhiên",
    main_link: "https://example.com/giuong-ngu-go-tu-nhien",
    backup_link: "https://backup.com/giuong-ngu-go-tu-nhien",
    created_at: "2025-05-02 10:24:18",
    updated_at: "2025-05-02 10:24:18"
  },
  {
    id: 110,
    category_id: 3,
    name: "Sofa Nỉ Cao Cấp",
    slug: "sofa-ni-cao-cap",
    description: "Sofa nỉ cao cấp với kiểu dáng hiện đại, màu sắc thanh lịch, phù hợp với mọi không gian phòng khách.",
    meta_title: "Sofa Nỉ Cao Cấp",
    meta_description: "Sofa nỉ cao cấp, dễ dàng vệ sinh và bền bỉ theo thời gian.",
    original_price: 8000000.00,
    discount_price: 7500000.00,
    hot: false,
    image_url: "https://images.unsplash.com/photo-1593642634367-d91a135587b2",
    alt_text: "Sofa nỉ cao cấp",
    main_link: "https://example.com/sofa-ni-cao-cap",
    backup_link: "https://backup.com/sofa-ni-cao-cap",
    created_at: "2025-05-02 10:24:18",
    updated_at: "2025-05-02 10:24:18"
  },
  {
    id: 111,
    category_id: 1,
    name: "Bàn Ăn Gỗ Sồi",
    slug: "ban-an-go-soi",
    description: "Bàn ăn gỗ sồi, thiết kế đơn giản nhưng sang trọng, phù hợp với nhiều không gian bếp.",
    meta_title: "Bàn ăn gỗ sồi",
    meta_description: "Bàn ăn gỗ sồi với thiết kế hiện đại, bền bỉ theo thời gian.",
    original_price: 4000000.00,
    discount_price: 3800000.00,
    hot: false,
    image_url: "https://images.unsplash.com/photo-1603791440384-56cd371ee9a7",
    alt_text: "Bàn ăn gỗ sồi",
    main_link: "https://example.com/ban-an-go-soi",
    backup_link: "https://backup.com/ban-an-go-soi",
    created_at: "2025-05-02 10:24:18",
    updated_at: "2025-05-02 10:24:18"
  },
  {
    id: 112,
    category_id: 2,
    name: "Ghế Văn Phòng Da Cao Cấp",
    slug: "ghe-van-phong-da-cao-cap",
    description: "Ghế văn phòng da cao cấp, thiết kế tiện dụng, giúp bạn ngồi thoải mái cả ngày dài.",
    meta_title: "Ghế văn phòng da cao cấp",
    meta_description: "Ghế văn phòng da cao cấp với thiết kế hiện đại, tạo sự thoải mái khi ngồi lâu.",
    original_price: 3000000.00,
    discount_price: 2700000.00,
    hot: false,
    image_url: "https://images.unsplash.com/photo-1617103222062-6e5060fa1ea3",
    alt_text: "Ghế văn phòng da cao cấp",
    main_link: "https://example.com/ghe-van-phong-da-cao-cap",
    backup_link: "https://backup.com/ghe-van-phong-da-cao-cap",
    created_at: "2025-05-02 10:24:18",
    updated_at: "2025-05-02 10:24:18"
  },
  {
    id: 113,
    category_id: 1,
    name: "Bàn làm việc gỗ công nghiệp",
    slug: "ban-lam-viec-go-cong-nghiep-2",
    description: "Bàn làm việc với gỗ công nghiệp chất lượng, dễ dàng kết hợp với các món đồ nội thất khác.",
    meta_title: "Bàn làm việc gỗ công nghiệp",
    meta_description: "Bàn làm việc hiện đại, đơn giản, chất liệu gỗ công nghiệp bền bỉ.",
    original_price: 2500000.00,
    discount_price: 2200000.00,
    hot: false,
    image_url: "https://images.unsplash.com/photo-1617103222062-6e5060fa1ea3",
    alt_text: "Bàn làm việc gỗ công nghiệp",
    main_link: "https://example.com/ban-lam-viec-go-cong-nghiep-2",
    backup_link: "https://backup.com/ban-lam-viec-go-cong-nghiep-2",
    created_at: "2025-05-02 10:24:18",
    updated_at: "2025-05-02 10:24:18"
  },
  {
    id: 114,
    category_id: 2,
    name: "Giường ngủ gỗ tự nhiên",
    slug: "giuong-ngu-go-tu-nhien-2",
    description: "Giường ngủ bằng gỗ tự nhiên, thiết kế đơn giản, thích hợp cho phòng ngủ hiện đại.",
    meta_title: "Giường ngủ gỗ tự nhiên",
    meta_description: "Giường ngủ gỗ tự nhiên với chất liệu bền bỉ, đem lại không gian thư giãn.",
    original_price: 5000000.00,
    discount_price: 4700000.00,
    hot: true,
    image_url: "https://images.unsplash.com/photo-1603791440384-56cd371ee9a7",
    alt_text: "Giường ngủ gỗ tự nhiên",
    main_link: "https://example.com/giuong-ngu-go-tu-nhien-2",
    backup_link: "https://backup.com/giuong-ngu-go-tu-nhien-2",
    created_at: "2025-05-02 10:24:18",
    updated_at: "2025-05-02 10:24:18"
  },
  {
    id: 115,
    category_id: 1,
    name: "Kệ sách gỗ tự nhiên",
    slug: "ke-sach-go-tu-nhien",
    description: "Kệ sách gỗ tự nhiên, thiết kế đơn giản nhưng hiện đại.",
    meta_title: "Kệ sách gỗ tự nhiên",
    meta_description: "Kệ sách gỗ tự nhiên, không gian lưu trữ lý tưởng cho các sách vở, đồ trang trí.",
    original_price: 2200000.00,
    discount_price: 2000000.00,
    hot: false,
    image_url: "https://images.unsplash.com/photo-1580199265076-4a97411a95c7",
    alt_text: "Kệ sách gỗ tự nhiên",
    main_link: "https://example.com/ke-sach-go-tu-nhien",
    backup_link: "https://backup.com/ke-sach-go-tu-nhien",
    created_at: "2025-05-02 10:24:18",
    updated_at: "2025-05-02 10:24:18"
  },
  // 15 sản phẩm còn lại ...
]


</script>
