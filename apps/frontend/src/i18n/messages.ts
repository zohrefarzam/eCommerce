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
    signInSignUp: string;
    switchToEnglish: string;
    switchToPersian: string;
  };
  auth: {
    signInMetaTitle: string;
    signUpMetaTitle: string;
    signInTitle: string;
    signUpTitle: string;
    subtitle: string;
    nameLabel: string;
    emailLabel: string;
    passwordLabel: string;
    signInButton: string;
    signUpButton: string;
    alreadyHaveAccount: string;
    noAccount: string;
    logIn: string;
    signUp: string;
    signOut: string;
    invalidCredentials: string;
    emailExists: string;
    requiredField: string;
    checkoutLoginRequired: string;
  };
  account: {
    notifications: string;
    orders: string;
    addresses: string;
    favorites: string;
    logout: string;
    ordersMetaTitle: string;
    addressesMetaTitle: string;
    favoritesMetaTitle: string;
    ordersTitle: string;
    addressesTitle: string;
    favoritesTitle: string;
    ordersEmpty: string;
    ordersLoadError: string;
    favoritesEmpty: string;
    addressesEmpty: string;
    manageAddresses: string;
    addNewAddress: string;
    myAddressesSection: string;
    postalCodeLabel: string;
    recipientLabel: string;
    selectLocationOnMap: string;
    locationMismatchHint: string;
    editLocation: string;
    ordersTabCurrent: string;
    ordersTabDelivered: string;
    ordersTabReturned: string;
    ordersTabCancelled: string;
    ordersSearch: string;
    ordersSearchNoResults: string;
    orderStatusCurrent: string;
    orderStatusDelivered: string;
    orderStatusReturned: string;
    orderStatusCancelled: string;
    orderNumber: (id: string) => string;
    orderClubPoints: (points: number) => string;
    viewInvoice: string;
    editProfile: string;
    editProfileTitle: string;
    saveProfile: string;
    cancel: string;
  };
  notifications: {
    metaTitle: string;
    pageTitle: string;
    dropdownTitle: string;
    viewAll: string;
    empty: string;
    markAllRead: string;
    orderPlacedTitle: string;
    orderPlacedBody: (orderId: string) => string;
    orderStatusTitle: string;
    orderStatusBody: (orderId: string, statusLabel: string) => string;
    timeJustNow: string;
    timeMinutes: (count: number) => string;
    timeHours: (count: number) => string;
    timeDays: (count: number) => string;
  };
  admin: {
    metaTitle: string;
    panelTitle: string;
    backToStore: string;
    notAuthorized: string;
    navOverview: string;
    navProducts: string;
    navOrders: string;
    navUsers: string;
    navCategories: string;
    overviewTitle: string;
    statProducts: string;
    statOrders: string;
    statRevenue: string;
    statUsers: string;
    productsTitle: string;
    addProduct: string;
    editProductTitle: string;
    productName: string;
    productPrice: string;
    productBrand: string;
    productCategory: string;
    productImage: string;
    uploadImage: string;
    removeImage: string;
    invalidImageType: string;
    imageTooLarge: string;
    ordersTitle: string;
    orderColId: string;
    orderColDate: string;
    orderColTotal: string;
    orderColStatus: string;
    usersTitle: string;
    userColName: string;
    userColEmail: string;
    userColRole: string;
    roleAdmin: string;
    roleCustomer: string;
    youBadge: string;
    categoriesTitle: string;
    addCategory: string;
    editCategoryTitle: string;
    categoryName: string;
    categorySlug: string;
    colActions: string;
    edit: string;
    delete: string;
    save: string;
    cancel: string;
    emptyProducts: string;
    emptyOrders: string;
    emptyCategories: string;
    confirmDeleteTitle: string;
    confirmDelete: string;
    requiredField: string;
    slugExists: string;
    paginationPrev: string;
    paginationNext: string;
    paginationInfo: (start: number, end: number, total: number) => string;
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
    sellerShipmentFeeLabel: string;
    deliveryScheduleFeeLabel: string;
    totalLabel: string;
    deliveryToSelectedAddress: string;
    changeAddress: string;
    sellerShipment: string;
    quantityShort: string;
    deliveryNotSelected: string;
    sellerShipmentNote: string;
    selectAddressModalTitle: string;
    mapPickerTitle: string;
    mapPickerHint: string;
    saveMapLocation: string;
    enterAddressManually: string;
    selectLocationOnMap: string;
    addressDetailHint: string;
    plaque: string;
    unit: string;
    confirmAndContinue: string;
    noCityOptions: string;
    paymentIncomplete: string;
    addressesLoadError: string;
    confirmationTitle: string;
    confirmationDescription: string;
    confirmationOrderId: string;
    viewOrders: string;
    confirmationContinueShopping: string;
  };
  productsListing: {
    allEyebrow: string;
    allTitle: string;
    filteredEyebrow: string;
    emptyForCategory: string;
    emptyForTab: string;
    emptyForFilters: string;
    emptyForSearch: string;
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
    signInSignUp: 'ورود / ثبت‌نام',
    switchToEnglish: 'English',
    switchToPersian: 'فارسی',
  },
  auth: {
    signInMetaTitle: 'ورود | رهپویان',
    signUpMetaTitle: 'ثبت‌نام | رهپویان',
    signInTitle: 'ورود به حساب',
    signUpTitle: 'ایجاد حساب کاربری',
    subtitle: 'اطلاعات خود را وارد کنید',
    nameLabel: 'نام',
    emailLabel: 'ایمیل یا شماره موبایل',
    passwordLabel: 'رمز عبور',
    signInButton: 'ورود',
    signUpButton: 'ایجاد حساب',
    alreadyHaveAccount: 'حساب دارید؟',
    noAccount: 'حساب ندارید؟',
    logIn: 'ورود',
    signUp: 'ثبت‌نام',
    signOut: 'خروج',
    invalidCredentials: 'ایمیل یا رمز عبور نادرست است.',
    emailExists: 'این ایمیل قبلاً ثبت شده است.',
    requiredField: 'این فیلد الزامی است',
    checkoutLoginRequired: 'برای تسویه حساب ابتدا وارد شوید.',
  },
  account: {
    notifications: 'اعلان‌ها',
    orders: 'سفارش‌ها',
    addresses: 'آدرس‌ها',
    favorites: 'علاقه‌مندی‌ها',
    logout: 'خروج از حساب کاربری',
    ordersMetaTitle: 'سفارش‌ها | رهپویان',
    addressesMetaTitle: 'آدرس‌ها | رهپویان',
    favoritesMetaTitle: 'علاقه‌مندی‌ها | رهپویان',
    ordersTitle: 'سفارش‌های من',
    addressesTitle: 'آدرس‌های من',
    favoritesTitle: 'علاقه‌مندی‌های من',
    ordersEmpty: 'هنوز سفارشی ثبت نکرده‌اید.',
    ordersLoadError: 'بارگذاری سفارش‌ها ناموفق بود. لطفاً دوباره تلاش کنید.',
    favoritesEmpty: 'هنوز محصولی به علاقه‌مندی‌ها اضافه نکرده‌اید.',
    addressesEmpty: 'آدرسی ذخیره نشده است.',
    manageAddresses: 'مدیریت آدرس‌ها در تسویه حساب',
    addNewAddress: 'افزودن آدرس جدید',
    myAddressesSection: 'آدرس‌های من',
    postalCodeLabel: 'کد پستی:',
    recipientLabel: 'گیرنده:',
    selectLocationOnMap: 'انتخاب موقعیت از نقشه',
    locationMismatchHint:
      'موقعیت ثبت‌شده با آدرس نوشته‌شده هم‌خوانی ندارد. برای تحویل بهتر آن را ویرایش کنید.',
    editLocation: 'ویرایش',
    ordersTabCurrent: 'جاری',
    ordersTabDelivered: 'تحویل شده',
    ordersTabReturned: 'مرجوع شده',
    ordersTabCancelled: 'لغو شده',
    ordersSearch: 'جستجوی سفارش',
    ordersSearchNoResults: 'سفارشی با این عبارت پیدا نشد.',
    orderStatusCurrent: 'در حال پردازش',
    orderStatusDelivered: 'تحویل شده',
    orderStatusReturned: 'مرجوع شده',
    orderStatusCancelled: 'لغو شده',
    orderNumber: (id) => `کد سفارش ${id}`,
    orderClubPoints: (points) => `${points.toLocaleString('fa-IR')} امتیاز`,
    viewInvoice: 'مشاهده فاکتور',
    editProfile: 'ویرایش پروفایل',
    editProfileTitle: 'ویرایش اطلاعات کاربری',
    saveProfile: 'ذخیره تغییرات',
    cancel: 'انصراف',
  },
  notifications: {
    metaTitle: 'اعلان‌ها | رهپویان',
    pageTitle: 'اعلان‌های من',
    dropdownTitle: 'اعلان‌ها',
    viewAll: 'مشاهده همه اعلان‌ها',
    empty: 'اعلانی برای نمایش وجود ندارد.',
    markAllRead: 'علامت‌گذاری همه به‌عنوان خوانده‌شده',
    orderPlacedTitle: 'سفارش ثبت شد',
    orderPlacedBody: (orderId) => `سفارش ${orderId} با موفقیت ثبت شد.`,
    orderStatusTitle: 'به‌روزرسانی سفارش',
    orderStatusBody: (orderId, statusLabel) =>
      `وضعیت سفارش ${orderId} به «${statusLabel}» تغییر کرد.`,
    timeJustNow: 'همین الان',
    timeMinutes: (count) => `${count.toLocaleString('fa-IR')} دقیقه پیش`,
    timeHours: (count) => `${count.toLocaleString('fa-IR')} ساعت پیش`,
    timeDays: (count) => `${count.toLocaleString('fa-IR')} روز پیش`,
  },
  admin: {
    metaTitle: 'پنل مدیریت | رهپویان',
    panelTitle: 'پنل مدیریت',
    backToStore: 'بازگشت به فروشگاه',
    notAuthorized: 'شما به این بخش دسترسی ندارید.',
    navOverview: 'نمای کلی',
    navProducts: 'محصولات',
    navOrders: 'سفارش‌ها',
    navUsers: 'کاربران',
    navCategories: 'دسته‌بندی‌ها',
    overviewTitle: 'نمای کلی',
    statProducts: 'محصولات',
    statOrders: 'سفارش‌ها',
    statRevenue: 'درآمد',
    statUsers: 'کاربران',
    productsTitle: 'مدیریت محصولات',
    addProduct: 'افزودن محصول',
    editProductTitle: 'ویرایش محصول',
    productName: 'نام محصول',
    productPrice: 'قیمت',
    productBrand: 'برند',
    productCategory: 'دسته‌بندی',
    productImage: 'تصویر محصول',
    uploadImage: 'بارگذاری تصویر',
    removeImage: 'حذف تصویر',
    invalidImageType: 'فقط تصاویر JPEG، PNG، WebP یا GIF مجاز است.',
    imageTooLarge: 'حجم تصویر باید کمتر از ۲ مگابایت باشد.',
    ordersTitle: 'مدیریت سفارش‌ها',
    orderColId: 'کد سفارش',
    orderColDate: 'تاریخ',
    orderColTotal: 'مبلغ',
    orderColStatus: 'وضعیت',
    usersTitle: 'مدیریت کاربران',
    userColName: 'نام',
    userColEmail: 'ایمیل',
    userColRole: 'نقش',
    roleAdmin: 'مدیر',
    roleCustomer: 'مشتری',
    youBadge: 'شما',
    categoriesTitle: 'مدیریت دسته‌بندی‌ها',
    addCategory: 'افزودن دسته‌بندی',
    editCategoryTitle: 'ویرایش دسته‌بندی',
    categoryName: 'نام دسته‌بندی',
    categorySlug: 'شناسه (slug)',
    colActions: 'عملیات',
    edit: 'ویرایش',
    delete: 'حذف',
    save: 'ذخیره',
    cancel: 'انصراف',
    emptyProducts: 'محصولی وجود ندارد.',
    emptyOrders: 'سفارشی وجود ندارد.',
    emptyCategories: 'دسته‌بندی‌ای وجود ندارد.',
    confirmDeleteTitle: 'حذف مورد',
    confirmDelete: 'آیا از حذف این مورد مطمئن هستید؟',
    requiredField: 'این فیلد الزامی است',
    slugExists: 'این شناسه قبلاً استفاده شده است.',
    paginationPrev: 'قبلی',
    paginationNext: 'بعدی',
    paginationInfo: (start, end, total) =>
      `نمایش ${start} تا ${end} از ${total}`,
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
    sellerShipmentFeeLabel: 'ارسال فروشنده',
    deliveryScheduleFeeLabel: 'هزینه زمان‌بندی تحویل',
    totalLabel: 'مبلغ قابل پرداخت',
    deliveryToSelectedAddress: 'ارسال به آدرس انتخاب شده',
    changeAddress: 'تغییر آدرس',
    sellerShipment: 'ارسال فروشنده',
    quantityShort: 'تعداد',
    deliveryNotSelected: 'زمان انتخاب نشده',
    sellerShipmentNote:
      'کالاهای این مرسوله به صورت مستقیم توسط فروشنده مورد نظر برای شما ارسال خواهد شد.',
    selectAddressModalTitle: 'انتخاب آدرس',
    mapPickerTitle: 'انتخاب موقعیت مکانی',
    mapPickerHint:
      'ابتدا موقعیت را از روی نقشه مشخص کنید. با کلیک روی نقشه، پین جابه‌جا می‌شود.',
    saveMapLocation: 'ثبت موقعیت مکانی',
    enterAddressManually: 'ثبت دستی آدرس',
    selectLocationOnMap: 'انتخاب موقعیت مکانی روی نقشه',
    addressDetailHint:
      'برای ارسال بهتر، آدرس را دقیق و با نشانه‌های قابل تشخیص بنویسید.',
    plaque: 'پلاک',
    unit: 'واحد',
    confirmAndContinue: 'تایید و ادامه',
    noCityOptions: 'بدون گزینه',
    paymentIncomplete: 'لطفاً اطلاعات پرداخت را کامل کنید.',
    addressesLoadError: 'بارگذاری آدرس‌ها ناموفق بود. لطفاً دوباره تلاش کنید.',
    confirmationTitle: 'سفارش شما ثبت شد',
    confirmationDescription:
      'سفارش با موفقیت ثبت شد. جزئیات را در بخش سفارش‌ها می‌توانید ببینید.',
    confirmationOrderId: 'شماره سفارش',
    viewOrders: 'مشاهده سفارش‌ها',
    confirmationContinueShopping: 'ادامه خرید',
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
    emptyForSearch:
      'محصولی با این عبارت پیدا نشد. عبارت دیگری امتحان کنید یا همهٔ محصولات را ببینید.',
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
    signInSignUp: 'Sign In / Sign Up',
    switchToEnglish: 'English',
    switchToPersian: 'فارسی',
  },
  auth: {
    signInMetaTitle: 'Sign In | Rahpoyan',
    signUpMetaTitle: 'Sign Up | Rahpoyan',
    signInTitle: 'Log in to Exclusive',
    signUpTitle: 'Create an account',
    subtitle: 'Enter your details below',
    nameLabel: 'Name',
    emailLabel: 'Email or Phone Number',
    passwordLabel: 'Password',
    signInButton: 'Log In',
    signUpButton: 'Create Account',
    alreadyHaveAccount: 'Already have account?',
    noAccount: "Don't have account?",
    logIn: 'Log in',
    signUp: 'Sign Up',
    signOut: 'Sign out',
    invalidCredentials: 'Invalid email or password.',
    emailExists: 'An account with this email already exists.',
    requiredField: 'This field is required',
    checkoutLoginRequired: 'Please sign in to continue to checkout.',
  },
  account: {
    notifications: 'Notifications',
    orders: 'Orders',
    addresses: 'Addresses',
    favorites: 'Favorites',
    logout: 'Sign out',
    ordersMetaTitle: 'Orders | Rahpoyan',
    addressesMetaTitle: 'Addresses | Rahpoyan',
    favoritesMetaTitle: 'Favorites | Rahpoyan',
    ordersTitle: 'My orders',
    addressesTitle: 'My addresses',
    favoritesTitle: 'My favorites',
    ordersEmpty: 'You have not placed any orders yet.',
    ordersLoadError: 'Could not load orders. Please try again.',
    favoritesEmpty: 'You have not added any favorites yet.',
    addressesEmpty: 'No saved addresses yet.',
    manageAddresses: 'Manage addresses at checkout',
    addNewAddress: 'Add new address',
    myAddressesSection: 'My addresses',
    postalCodeLabel: 'Postal code:',
    recipientLabel: 'Recipient:',
    selectLocationOnMap: 'Select location on map',
    locationMismatchHint:
      'The saved map location does not match the written address. Edit it for smoother delivery.',
    editLocation: 'Edit',
    ordersTabCurrent: 'Current',
    ordersTabDelivered: 'Delivered',
    ordersTabReturned: 'Returned',
    ordersTabCancelled: 'Cancelled',
    ordersSearch: 'Search orders',
    ordersSearchNoResults: 'No orders match your search.',
    orderStatusCurrent: 'In progress',
    orderStatusDelivered: 'Delivered',
    orderStatusReturned: 'Returned',
    orderStatusCancelled: 'Cancelled',
    orderNumber: (id) => `Order ${id}`,
    orderClubPoints: (points) =>
      `${points.toLocaleString('en-US')} club points`,
    viewInvoice: 'View invoice',
    editProfile: 'Edit profile',
    editProfileTitle: 'Edit profile information',
    saveProfile: 'Save changes',
    cancel: 'Cancel',
  },
  notifications: {
    metaTitle: 'Notifications | Rahpoyan',
    pageTitle: 'My notifications',
    dropdownTitle: 'Notifications',
    viewAll: 'View all notifications',
    empty: 'No notifications yet.',
    markAllRead: 'Mark all as read',
    orderPlacedTitle: 'Order placed',
    orderPlacedBody: (orderId) => `Order ${orderId} was placed successfully.`,
    orderStatusTitle: 'Order update',
    orderStatusBody: (orderId, statusLabel) =>
      `Order ${orderId} is now ${statusLabel.toLowerCase()}.`,
    timeJustNow: 'Just now',
    timeMinutes: (count) => `${count} min ago`,
    timeHours: (count) => `${count} hr ago`,
    timeDays: (count) => `${count} day${count === 1 ? '' : 's'} ago`,
  },
  admin: {
    metaTitle: 'Admin Panel | Rahpoyan',
    panelTitle: 'Admin Panel',
    backToStore: 'Back to store',
    notAuthorized: 'You do not have access to this area.',
    navOverview: 'Overview',
    navProducts: 'Products',
    navOrders: 'Orders',
    navUsers: 'Users',
    navCategories: 'Categories',
    overviewTitle: 'Overview',
    statProducts: 'Products',
    statOrders: 'Orders',
    statRevenue: 'Revenue',
    statUsers: 'Users',
    productsTitle: 'Manage products',
    addProduct: 'Add product',
    editProductTitle: 'Edit product',
    productName: 'Product name',
    productPrice: 'Price',
    productBrand: 'Brand',
    productCategory: 'Category',
    productImage: 'Product image',
    uploadImage: 'Upload image',
    removeImage: 'Remove image',
    invalidImageType: 'Please choose a JPEG, PNG, WebP, or GIF image.',
    imageTooLarge: 'Image must be smaller than 2 MB.',
    ordersTitle: 'Manage orders',
    orderColId: 'Order',
    orderColDate: 'Date',
    orderColTotal: 'Total',
    orderColStatus: 'Status',
    usersTitle: 'Manage users',
    userColName: 'Name',
    userColEmail: 'Email',
    userColRole: 'Role',
    roleAdmin: 'Admin',
    roleCustomer: 'Customer',
    youBadge: 'You',
    categoriesTitle: 'Manage categories',
    addCategory: 'Add category',
    editCategoryTitle: 'Edit category',
    categoryName: 'Category name',
    categorySlug: 'Slug',
    colActions: 'Actions',
    edit: 'Edit',
    delete: 'Delete',
    save: 'Save',
    cancel: 'Cancel',
    emptyProducts: 'No products yet.',
    emptyOrders: 'No orders yet.',
    emptyCategories: 'No categories yet.',
    confirmDeleteTitle: 'Delete item',
    confirmDelete: 'Are you sure you want to delete this item?',
    requiredField: 'This field is required',
    slugExists: 'This slug is already in use.',
    paginationPrev: 'Previous',
    paginationNext: 'Next',
    paginationInfo: (start, end, total) =>
      `Showing ${start}–${end} of ${total}`,
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
    sellerShipmentFeeLabel: 'Seller shipment',
    deliveryScheduleFeeLabel: 'Scheduled delivery',
    totalLabel: 'Total',
    deliveryToSelectedAddress: 'Ship to selected address',
    changeAddress: 'Change address',
    sellerShipment: 'Seller shipment',
    quantityShort: 'Qty',
    deliveryNotSelected: 'No delivery time selected',
    sellerShipmentNote:
      'Items in this shipment will be sent directly to you by the seller.',
    selectAddressModalTitle: 'Select address',
    mapPickerTitle: 'Pick location on map',
    mapPickerHint: 'Click the map to move the pin to your delivery location.',
    saveMapLocation: 'Confirm map location',
    enterAddressManually: 'Enter address manually',
    selectLocationOnMap: 'Pick location on map',
    addressDetailHint:
      'Use a clear, recognizable address to help with delivery.',
    plaque: 'Building no.',
    unit: 'Unit',
    confirmAndContinue: 'Confirm and continue',
    noCityOptions: 'No options',
    paymentIncomplete: 'Please complete your payment details.',
    addressesLoadError: 'Could not load addresses. Please try again.',
    confirmationTitle: 'Order placed',
    confirmationDescription:
      'Your order was placed successfully. You can track it in your orders.',
    confirmationOrderId: 'Order number',
    viewOrders: 'View orders',
    confirmationContinueShopping: 'Continue shopping',
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
    emptyForSearch:
      'No products match your search. Try another term or browse all products.',
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
