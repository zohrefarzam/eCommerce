import type { Locale } from './config';

export type Messages = {
  meta: {
    title: string;
    description: string;
  };
  header: {
    brand: string;
    search: string;
    notifications: string;
    cart: string;
    account: string;
    switchToEnglish: string;
    switchToPersian: string;
  };
  productCard: {
    buy: string;
    view: string;
    addToWishlist: string;
    removeFromWishlist: string;
    discountLabel: (percent: number) => string;
  };
  productDetail: {
    selectColor: string;
    addToWishlist: string;
    addToCart: string;
    readMore: string;
    readLess: string;
    detailsTitle: string;
    viewMore: string;
    viewLess: string;
    metaTitle: (name: string) => string;
    breadcrumbSmartphones: string;
    reviewsTitle: string;
    reviewsOfCount: (count: number) => string;
    leaveCommentPlaceholder: string;
    writeReviewTitle: string;
    writeReviewHint: string;
    submitReview: string;
    yourRatingLabel: string;
    submitReviewHint: string;
    reviewSubmitted: string;
    reviewsViewMore: string;
    relatedProductsTitle: string;
  };
  cart: {
    metaTitle: string;
    title: string;
    emptyTitle: string;
    emptyDescription: string;
    browseProducts: string;
    dropdownTitle: string;
    viewCart: string;
    removeItem: string;
    decreaseQuantity: string;
    increaseQuantity: string;
    quantityLabel: string;
    orderSummaryTitle: string;
    discountCodeLabel: string;
    bonusCardLabel: string;
    bonusCardApply: string;
    subtotalLabel: string;
    taxLabel: string;
    shippingLabel: string;
    totalLabel: string;
    checkout: string;
  };
  checkout: {
    metaTitle: string;
    stepAddress: string;
    stepShipping: string;
    stepPayment: string;
    selectAddressTitle: string;
    addAddress: string;
    editAddress: string;
    deleteAddress: string;
    addressTagHome: string;
    addressTagOffice: string;
    addressTagOther: string;
    shipmentMethodTitle: string;
    shippingFree: string;
    shippingFreeDesc: string;
    shippingExpress: string;
    shippingExpressDesc: string;
    shippingScheduled: string;
    shippingScheduledDesc: string;
    selectDate: string;
    selectTimeSlot: string;
    deliveryBy: string;
    paymentTitle: string;
    paymentOnline: string;
    paymentOnlineDesc: string;
    paymentSnapp: string;
    paymentCard: string;
    paymentPaypal: string;
    paymentPaypalCredit: string;
    cardholderName: string;
    cardNumber: string;
    expiryDate: string;
    cvv: string;
    billingSameAsShipping: string;
    orderSummaryTitle: string;
    addressReview: string;
    shipmentReview: string;
    back: string;
    next: string;
    pay: string;
    emptyCartTitle: string;
    emptyCartDescription: string;
    continueShopping: string;
    addAddressModalTitle: string;
    addressLabel: string;
    recipientName: string;
    province: string;
    city: string;
    street: string;
    postalCode: string;
    phone: string;
    saveAddress: string;
    cancel: string;
    requiredField: string;
    onlinePaymentNote: string;
    subtotalLabel: string;
    taxLabel: string;
    shippingLabel: string;
    totalLabel: string;
  };
  productsListing: {
    allEyebrow: string;
    allTitle: string;
    filteredEyebrow: string;
    emptyForCategory: string;
    emptyForTab: string;
    emptyForFilters: string;
    clearFiltersLabel: string;
    metaProductsTitle: string;
    metaCategoryTitle: (category: string) => string;
    metaTabTitle: (collection: string) => string;
    metaFilteredTitle: (collection: string, category: string) => string;
    breadcrumbHome: string;
    breadcrumbCatalog: string;
    breadcrumbAriaLabel: string;
    filtersTitle: string;
    filtersAriaLabel: string;
    priceFilter: string;
    brandFilter: string;
    storageFilter: string;
    priceFrom: string;
    priceTo: string;
    brandSearch: string;
    applyFilters: string;
    resetFilters: string;
    selectedCount: (count: number) => string;
    productsResultLabel: (count: number) => string;
    sortLabel: string;
    sortRating: string;
    sortPriceAsc: string;
    sortPriceDesc: string;
    sortName: string;
    paginationAriaLabel: string;
    paginationPrev: string;
    paginationNext: string;
    paginationPage: (page: number) => string;
  };
};

const fa: Messages = {
  meta: {
    title: 'رهپویان | فروشگاه',
    description: 'فروشگاه آنلاین محصولات دیجیتال',
  },
  header: {
    brand: 'رهپویان',
    search: 'جستجو',
    notifications: 'اعلان‌ها',
    cart: 'سبد خرید',
    account: 'حساب کاربری',
    switchToEnglish: 'English',
    switchToPersian: 'فارسی',
  },
  productCard: {
    buy: 'افزودن به سبد',
    view: 'مشاهده محصول',
    addToWishlist: 'افزودن به علاقه‌مندی',
    removeFromWishlist: 'حذف از علاقه‌مندی',
    discountLabel: (percent) => `${percent}٪ تخفیف`,
  },
  productDetail: {
    selectColor: 'انتخاب رنگ :',
    addToWishlist: 'افزودن به علاقه‌مندی‌ها',
    addToCart: 'افزودن به سبد',
    readMore: 'بیشتر…',
    readLess: 'کمتر',
    detailsTitle: 'جزئیات',
    viewMore: 'مشاهده بیشتر',
    viewLess: 'بستن',
    metaTitle: (name) => `${name} | رهپویان`,
    breadcrumbSmartphones: 'گوشی هوشمند',
    reviewsTitle: 'نظرات',
    reviewsOfCount: (count) => `از ${count} نظر`,
    leaveCommentPlaceholder: 'نظر خود را بنویسید…',
    writeReviewTitle: 'نظر خود را ثبت کنید',
    writeReviewHint: 'تجربهٔ خود از این محصول را با دیگران به اشتراک بگذارید.',
    submitReview: 'ثبت نظر',
    yourRatingLabel: 'امتیاز شما',
    submitReviewHint: 'برای فعال شدن دکمه، چند جمله بنویسید.',
    reviewSubmitted: 'نظر شما ثبت شد. پس از بررسی نمایش داده می‌شود.',
    reviewsViewMore: 'مشاهده بیشتر',
    relatedProductsTitle: 'محصولات مرتبط',
  },
  cart: {
    metaTitle: 'سبد خرید | رهپویان',
    title: 'سبد خرید',
    emptyTitle: 'سبد خرید شما خالی است',
    emptyDescription: 'محصولی به سبد اضافه نکرده‌اید. از فروشگاه شروع کنید.',
    browseProducts: 'مشاهده محصولات',
    dropdownTitle: 'سبد خرید',
    viewCart: 'مشاهده سبد خرید',
    removeItem: 'حذف از سبد',
    decreaseQuantity: 'کاهش تعداد',
    increaseQuantity: 'افزایش تعداد',
    quantityLabel: 'تعداد',
    orderSummaryTitle: 'خلاصه سفارش',
    discountCodeLabel: 'کد تخفیف / کد معرف',
    bonusCardLabel: 'شماره کارت باشگاه مشتریان',
    bonusCardApply: 'اعمال',
    subtotalLabel: 'جمع جزء',
    taxLabel: 'مالیات تقریبی',
    shippingLabel: 'هزینه ارسال تقریبی',
    totalLabel: 'مبلغ قابل پرداخت',
    checkout: 'تسویه حساب',
  },
  checkout: {
    metaTitle: 'تسویه حساب | رهپویان',
    stepAddress: 'آدرس',
    stepShipping: 'ارسال',
    stepPayment: 'پرداخت',
    selectAddressTitle: 'انتخاب آدرس',
    addAddress: 'افزودن آدرس جدید',
    editAddress: 'ویرایش آدرس',
    deleteAddress: 'حذف آدرس',
    addressTagHome: 'منزل',
    addressTagOffice: 'محل کار',
    addressTagOther: 'سایر',
    shipmentMethodTitle: 'روش ارسال',
    shippingFree: 'رایگان',
    shippingFreeDesc: 'ارسال عادی (۳ تا ۵ روز کاری)',
    shippingExpress: '۸۵۰٬۰۰۰ تومان',
    shippingExpressDesc: 'ارسال سریع (همان روز یا روز بعد)',
    shippingScheduled: 'زمان‌بندی',
    shippingScheduledDesc: 'انتخاب روز و بازهٔ تحویل',
    selectDate: 'انتخاب روز',
    selectTimeSlot: 'بازهٔ تحویل',
    deliveryBy: 'تحویل تا',
    paymentTitle: 'پرداخت',
    paymentOnline: 'پرداخت اینترنتی',
    paymentOnlineDesc: 'انتقال به درگاه بانکی (شتاب)',
    paymentSnapp: 'اسنپ‌پی',
    paymentCard: 'کارت بانکی',
    paymentPaypal: 'PayPal',
    paymentPaypalCredit: 'PayPal Credit',
    cardholderName: 'نام دارنده کارت',
    cardNumber: 'شماره کارت',
    expiryDate: 'تاریخ انقضا',
    cvv: 'CVV',
    billingSameAsShipping: 'آدرس صورتحساب همان آدرس ارسال است',
    orderSummaryTitle: 'خلاصه سفارش',
    addressReview: 'آدرس',
    shipmentReview: 'روش ارسال',
    back: 'بازگشت',
    next: 'ادامه',
    pay: 'پرداخت و ثبت سفارش',
    emptyCartTitle: 'سبد خرید خالی است',
    emptyCartDescription: 'برای ادامهٔ تسویه، ابتدا محصول به سبد اضافه کنید.',
    continueShopping: 'بازگشت به فروشگاه',
    addAddressModalTitle: 'آدرس جدید',
    addressLabel: 'عنوان آدرس',
    recipientName: 'نام گیرنده',
    province: 'استان',
    city: 'شهر',
    street: 'آدرس کامل',
    postalCode: 'کد پستی',
    phone: 'شماره موبایل',
    saveAddress: 'ذخیره آدرس',
    cancel: 'انصراف',
    requiredField: 'این فیلد الزامی است',
    onlinePaymentNote:
      'پس از تأیید، به درگاه پرداخت امن بانکی هدایت می‌شوید — مشابه دیجی‌کالا.',
    subtotalLabel: 'جمع کالاها',
    taxLabel: 'مالیات',
    shippingLabel: 'هزینه ارسال',
    totalLabel: 'مبلغ قابل پرداخت',
  },
  productsListing: {
    allEyebrow: 'فروشگاه',
    allTitle: 'همه محصولات',
    filteredEyebrow: 'محصولات بر اساس دسته',
    emptyForCategory:
      'در این دسته محصول نمایشی موجود نیست. همهٔ محصولات را ببینید یا دستهٔ دیگری انتخاب کنید.',
    emptyForTab:
      'در این مجموعه محصول نمایشی موجود نیست. همهٔ محصولات را ببینید یا مجموعهٔ دیگری انتخاب کنید.',
    emptyForFilters:
      'با این ترکیب فیلتر محصولی پیدا نشد. فیلترها را پاک کنید یا گزینهٔ دیگری انتخاب کنید.',
    clearFiltersLabel: 'مشاهده همه محصولات',
    metaProductsTitle: 'محصولات | رهپویان',
    metaCategoryTitle: (category) => `${category} | رهپویان`,
    metaTabTitle: (collection) => `${collection} | رهپویان`,
    metaFilteredTitle: (collection, category) =>
      `${collection} · ${category} | رهپویان`,
    breadcrumbHome: 'خانه',
    breadcrumbCatalog: 'فروشگاه',
    breadcrumbAriaLabel: 'مسیر صفحه',
    filtersTitle: 'فیلترها',
    filtersAriaLabel: 'فیلتر محصولات',
    priceFilter: 'قیمت',
    brandFilter: 'برند',
    storageFilter: 'حافظه داخلی',
    priceFrom: 'از',
    priceTo: 'تا',
    brandSearch: 'جستجو',
    applyFilters: 'اعمال فیلتر',
    resetFilters: 'پاک کردن فیلترها',
    selectedCount: (count) => `محصولات انتخاب‌شده: ${count}`,
    productsResultLabel: (count) => `نتایج محصولات: ${count}`,
    sortLabel: 'مرتب‌سازی',
    sortRating: 'بر اساس امتیاز',
    sortPriceAsc: 'ارزان‌ترین',
    sortPriceDesc: 'گران‌ترین',
    sortName: 'نام محصول',
    paginationAriaLabel: 'صفحه‌بندی محصولات',
    paginationPrev: 'قبلی',
    paginationNext: 'بعدی',
    paginationPage: (page) => `صفحه ${page}`,
  },
};

const en: Messages = {
  meta: {
    title: 'Rahpoyan | Store',
    description: 'Online store for digital products',
  },
  header: {
    brand: 'Rahpoyan',
    search: 'Search',
    notifications: 'Notifications',
    cart: 'Cart',
    account: 'Account',
    switchToEnglish: 'English',
    switchToPersian: 'فارسی',
  },
  productCard: {
    buy: 'Add to cart',
    view: 'View product',
    addToWishlist: 'Add to wishlist',
    removeFromWishlist: 'Remove from wishlist',
    discountLabel: (percent) => `${percent}% off`,
  },
  productDetail: {
    selectColor: 'Select color :',
    addToWishlist: 'Add to Wishlist',
    addToCart: 'Add to Cart',
    readMore: 'more…',
    readLess: 'less',
    detailsTitle: 'Details',
    viewMore: 'View More',
    viewLess: 'View Less',
    metaTitle: (name) => `${name} | Rahpoyan`,
    breadcrumbSmartphones: 'Smartphones',
    reviewsTitle: 'Reviews',
    reviewsOfCount: (count) => `of ${count} reviews`,
    leaveCommentPlaceholder: 'Share your experience with this product…',
    writeReviewTitle: 'Write a review',
    writeReviewHint: 'Tell others what you liked or what could be better.',
    submitReview: 'Post review',
    yourRatingLabel: 'Your rating',
    submitReviewHint: 'Write a few words to enable the button.',
    reviewSubmitted:
      'Thanks! Your review was submitted and will appear after moderation.',
    reviewsViewMore: 'View More',
    relatedProductsTitle: 'Related Products',
  },
  cart: {
    metaTitle: 'Shopping Cart | Rahpoyan',
    title: 'Shopping Cart',
    emptyTitle: 'Your cart is empty',
    emptyDescription:
      'You have not added any products yet. Browse the store to get started.',
    browseProducts: 'Browse products',
    dropdownTitle: 'Cart',
    viewCart: 'View cart',
    removeItem: 'Remove from cart',
    decreaseQuantity: 'Decrease quantity',
    increaseQuantity: 'Increase quantity',
    quantityLabel: 'Quantity',
    orderSummaryTitle: 'Order Summary',
    discountCodeLabel: 'Discount code / Promo code',
    bonusCardLabel: 'Your bonus card number',
    bonusCardApply: 'Apply',
    subtotalLabel: 'Subtotal',
    taxLabel: 'Estimated Tax',
    shippingLabel: 'Estimated shipping & Handling',
    totalLabel: 'Total',
    checkout: 'Checkout',
  },
  checkout: {
    metaTitle: 'Checkout | Rahpoyan',
    stepAddress: 'Address',
    stepShipping: 'Shipping',
    stepPayment: 'Payment',
    selectAddressTitle: 'Select Address',
    addAddress: 'Add New Address',
    editAddress: 'Edit address',
    deleteAddress: 'Delete address',
    addressTagHome: 'HOME',
    addressTagOffice: 'OFFICE',
    addressTagOther: 'OTHER',
    shipmentMethodTitle: 'Shipment Method',
    shippingFree: 'Free',
    shippingFreeDesc: 'Regular shipment',
    shippingExpress: '$29',
    shippingExpressDesc: 'Get your delivery as soon as possible',
    shippingScheduled: 'Schedule',
    shippingScheduledDesc: 'Pick a date when you want your delivery',
    selectDate: 'Select Date',
    selectTimeSlot: 'Time slot',
    deliveryBy: 'Delivery by',
    paymentTitle: 'Payment',
    paymentOnline: 'Online payment',
    paymentOnlineDesc: 'Redirect to secure payment gateway',
    paymentSnapp: 'Snapp Pay',
    paymentCard: 'Credit Card',
    paymentPaypal: 'PayPal',
    paymentPaypalCredit: 'PayPal Credit',
    cardholderName: 'Cardholder Name',
    cardNumber: 'Card Number',
    expiryDate: 'Exp. Date',
    cvv: 'CVV',
    billingSameAsShipping: 'Same as billing address',
    orderSummaryTitle: 'Order Summary',
    addressReview: 'Address',
    shipmentReview: 'Shipment',
    back: 'Back',
    next: 'Next',
    pay: 'Pay',
    emptyCartTitle: 'Your cart is empty',
    emptyCartDescription: 'Add products to your cart before checkout.',
    continueShopping: 'Continue shopping',
    addAddressModalTitle: 'New address',
    addressLabel: 'Address label',
    recipientName: 'Recipient name',
    province: 'State / Province',
    city: 'City',
    street: 'Street address',
    postalCode: 'Postal code',
    phone: 'Phone',
    saveAddress: 'Save address',
    cancel: 'Cancel',
    requiredField: 'This field is required',
    onlinePaymentNote:
      'You will be redirected to a secure bank gateway to complete payment.',
    subtotalLabel: 'Subtotal',
    taxLabel: 'Estimated Tax',
    shippingLabel: 'Estimated shipping & Handling',
    totalLabel: 'Total',
  },
  productsListing: {
    allEyebrow: 'Store',
    allTitle: 'All products',
    filteredEyebrow: 'Browsing category',
    emptyForCategory:
      'No demo products were matched in this category. Browse all items or choose another category.',
    emptyForTab:
      'No demo products were matched in this collection. Browse all items or choose another collection.',
    emptyForFilters:
      'No products matched this combination. Clear filters or try another selection.',
    clearFiltersLabel: 'Browse all products',
    metaProductsTitle: 'Products | Rahpoyan',
    metaCategoryTitle: (category) => `${category} | Rahpoyan`,
    metaTabTitle: (collection) => `${collection} | Rahpoyan`,
    metaFilteredTitle: (collection, category) =>
      `${collection} · ${category} | Rahpoyan`,
    breadcrumbHome: 'Home',
    breadcrumbCatalog: 'Catalog',
    breadcrumbAriaLabel: 'Breadcrumb',
    filtersTitle: 'Filters',
    filtersAriaLabel: 'Product filters',
    priceFilter: 'Price',
    brandFilter: 'Brand',
    storageFilter: 'Built-in memory',
    priceFrom: 'From',
    priceTo: 'To',
    brandSearch: 'Search',
    applyFilters: 'Apply filters',
    resetFilters: 'Clear filters',
    selectedCount: (count) => `Selected products: ${count}`,
    productsResultLabel: (count) => `Products result: ${count}`,
    sortLabel: 'Sort',
    sortRating: 'By rating',
    sortPriceAsc: 'Price: low to high',
    sortPriceDesc: 'Price: high to low',
    sortName: 'Name',
    paginationAriaLabel: 'Products pagination',
    paginationPrev: 'Previous',
    paginationNext: 'Next',
    paginationPage: (page) => `Page ${page}`,
  },
};

const messagesByLocale: Record<Locale, Messages> = { fa, en };

export function getMessages(locale: Locale): Messages {
  return messagesByLocale[locale];
}
