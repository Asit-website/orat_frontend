import React, { useEffect, useMemo, useRef, useState } from "react";
import { Productbanner1 } from '../image';
import { Link, useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { CiFilter } from 'react-icons/ci';
import { BsHeart, BsHeartFill } from "react-icons/bs";
import Button from 'react-bootstrap/Button';
import { Modal, Tabs, Tab } from 'react-bootstrap';
import Filter from '../components/Filter';
import { products_list, getProductPageBanner, getEditList, productColor, productSize, recentproductList } from '../services/Product-service';
import { menuList, categoryList } from '../services/General-service';
import { addWishList, removeWishList, getWishList } from '../services/User-service';
import { useSelector, useDispatch } from 'react-redux';
import { getWishListd } from '../Redux/features/wishlist/WishListSlice';
import { toast } from "react-toastify";
import Loader from '../components/Loader';
import Footer from '../components/footer';
import LoginModal from '../components/loginmodal';
import { formatPrice } from "../utils/formatPrice";
import ReactSlider from 'react-slider';

function Category() {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.userInfo);
  const wishlist = useSelector((state) => state.wishlist);
  const recentlyViewedProducts = useSelector((state) => state.products?.recentlyViewed);
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [show, setShow] = useState(false);
  const [activeTab, setActiveTab] = useState('v-pills-home');
  const [productsArr, setProductsArr] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortby] = useState('popular');
  const [sortBylabel, setSortbylabel] = useState('');
  const [selectedSortChips, setSelectedSortChips] = useState([]);
  const [pendingSort, setPendingSort] = useState('');
  const [defaultBannerImage, setDefaultBannerImage] = useState(null);
  const [bannerimage, setbannerimage] = useState(Productbanner1);
  const [bannerLink, setBannerLink] = useState('/');
  const [catNamelabel, setcatNamelabel] = useState('ALL');
  const [isMobileHeaderBarHidden, setIsMobileHeaderBarHidden] = useState(false);
  const [queryParameters, setSearchParams] = useSearchParams();
  const [minPrice, setMinPrice] = useState(queryParameters.get('min_price') || '300');
  const [maxPrice, setMaxPrice] = useState(queryParameters.get('max_price') || '100000');
  const [wishlistItems, setWishlistItems] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [filterCategories, setFilterCategories] = useState([]);
  const [filterColors, setFilterColors] = useState([]);
  const [filterSizes, setFilterSizes] = useState([]);
  const [pendingSizeIds, setPendingSizeIds] = useState([]);
  const [pendingColorIds, setPendingColorIds] = useState([]);
  const [pendingCategoryIds, setPendingCategoryIds] = useState([]);
  const [pendingReadyToShip, setPendingReadyToShip] = useState(false);

  const navigate = useNavigate();
  const productListContainerRef = useRef(null);

  const sizePriority = {
    XXS: 0,
    XS: 1,
    S: 2,
    M: 3,
    L: 4,
    XL: 5,
    '2XL': 6,
    XXL: 6,
    '3XL': 7,
    '4XL': 8,
    '5XL': 9,
    '6XL': 10,
    '7XL': 11,
    '8XL': 12,
  };
  const normalizeSize = (val) => String(val || '').trim().toUpperCase().replace(/\s+/g, '');
  const sizeRank = (val) => {
    const s = normalizeSize(val);
    if (Object.prototype.hasOwnProperty.call(sizePriority, s)) return sizePriority[s];
    const m = s.match(/^([0-9]{1,3})$/);
    if (m) return 100 + parseInt(m[1], 10);
    return 200;
  };

  // Fetch filter metadata for building active filter chips (categories, colors, sizes)
  useEffect(() => {
    const fetchFilterMeta = async () => {
      try {
        categoryList('')?.then((data) => setFilterCategories(data.data || []));
        productColor('')?.then((data) => setFilterColors(data.data || []));
        productSize('')?.then((data) => setFilterSizes(data.data || []));
      } catch (e) {
        console.error('Error fetching filter metadata for chips', e);
      }
    };

    const sizePriority = {
      XXS: 0,
      XS: 1,
      S: 2,
      M: 3,
      L: 4,
      XL: 5,
      '2XL': 6,
      XXL: 6,
      '3XL': 7,
      '4XL': 8,
      '5XL': 9,
      '6XL': 10,
      '7XL': 11,
      '8XL': 12,
    };
    const normalizeSize = (val) => String(val || '').trim().toUpperCase().replace(/\s+/g, '');
    const sizeRank = (val) => {
      const s = normalizeSize(val);
      if (Object.prototype.hasOwnProperty.call(sizePriority, s)) return sizePriority[s];
      const m = s.match(/^([0-9]{1,3})$/);
      if (m) return 100 + parseInt(m[1], 10);
      return 200;
    };
    fetchFilterMeta();
  }, []);

  // Build active filters for header chips from URL params
  const selectedCategoryIds = queryParameters.get('category_ids')?.split('-').filter(Boolean) || [];
  const selectedSizeIds = queryParameters.get('size_ids')?.split('-').filter(Boolean) || [];
  const selectedColorIds = queryParameters.get('color_ids')?.split('-').filter(Boolean) || [];
  const isReadyToShipSelected = queryParameters.get('ready_to_ship') === '1';

  const activeCategoryLabels = filterCategories
    .filter((c) => selectedCategoryIds.includes(String(c.id)))
    .map((c) => c.title);
  const activeSizeLabels = filterSizes
    .filter((s) => selectedSizeIds.includes(String(s.id)))
    .map((s) => s.size);
  const activeColorLabels = filterColors
    .filter((c) => selectedColorIds.includes(String(c.id)))
    .map((c) => c.title);

  const hasAnyActiveFilters =
    activeCategoryLabels.length > 0 ||
    activeSizeLabels.length > 0 ||
    activeColorLabels.length > 0 ||
    isReadyToShipSelected ||
    !!queryParameters.get('sort_by');

  useEffect(() => {
    const node = document.querySelector('.Productpage');
    if (!node) return;
    if (hasAnyActiveFilters) {
      node.classList.add('filter-icon-active');
    } else {
      node.classList.remove('filter-icon-active');
    }
  }, [hasAnyActiveFilters]);

  const removeHeaderFilterValue = (paramKey, valueToRemove) => {
    const newParams = new URLSearchParams(queryParameters);
    const currentIds = newParams.get(paramKey)?.split('-').filter(Boolean) || [];
    const updatedIds = currentIds.filter((v) => v !== String(valueToRemove));
    if (updatedIds.length > 0) {
      newParams.set(paramKey, updatedIds.join('-'));
    } else {
      newParams.delete(paramKey);
    }
    setSearchParams(newParams);
  };

  const clearAllHeaderFilters = () => {
    const newParams = new URLSearchParams(queryParameters);
    ['category_ids', 'size_ids', 'color_ids', 'occasion_ids', 'designer_id', 'style_id', 'pattern_id', 'fabric_id', 'ready_to_ship', 'min_price', 'max_price'].forEach((key) => {
      newParams.delete(key);
    });
    setSearchParams(newParams);
  };

  // Check if current page is a campaign listing (e.g. /category/?campaign=1)
  const isCampaignPage = !!queryParameters.get('campaign');
  // Check if current page is an occasion listing (e.g. /category/?occasion_id=101)
  const isOccasionPage = !!queryParameters.get('occasion_id');
  const isRecentlyViewedMode = queryParameters.get('view') === 'recently';
  const isTrendingMode = queryParameters.get('view') === 'trending';

  // Add a body class in mobile for recently viewed/trending page to drive CSS-only layout (only product cards)
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 575px)');
    const apply = () => {
      if ((isRecentlyViewedMode || isTrendingMode) && mq.matches) {
        document.body.classList.add('recently-mobile-slim');
      } else {
        document.body.classList.remove('recently-mobile-slim');
      }
    };
    apply();
    const onChange = () => apply();
    if (mq.addEventListener) mq.addEventListener('change', onChange);
    else mq.addListener(onChange);
    return () => {
      document.body.classList.remove('recently-mobile-slim');
      if (mq.removeEventListener) mq.removeEventListener('change', onChange);
      else mq.removeListener(onChange);
    };
  }, [isRecentlyViewedMode, isTrendingMode]);
  // Show Pernia-style sort chips on ALL category pages (base, campaign, occasion)
  const showSortChips = true;


  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setPendingSizeIds(queryParameters.get('size_ids')?.split('-').filter(Boolean) || []);
    setPendingColorIds(queryParameters.get('color_ids')?.split('-').filter(Boolean) || []);
    setPendingCategoryIds(queryParameters.get('category_ids')?.split('-').filter(Boolean) || []);
    setPendingReadyToShip(queryParameters.get('ready_to_ship') === '1');
    setPendingSort(queryParameters.get('sort_by') || '');
    setMinPrice(queryParameters.get('min_price') || '300');
    setMaxPrice(queryParameters.get('max_price') || '100000');
    setShow(true);
  };

  const togglePendingId = (setter, id) => {
    const strId = String(id);
    setter((prev) => {
      const next = Array.isArray(prev) ? prev : [];
      if (next.includes(strId)) {
        return next.filter((x) => x !== strId);
      }
      return [...next, strId];
    });
  };
  const modalHide = () => setModalShow(false);

  // Check if product is in wishlist
  const isProductInWishlist = (productId) => {
    if (wishlist?.wishlistItems && wishlist.wishlistItems.length > 0) {
      return wishlist.wishlistItems.some(item => item.product_id === productId || item.id === productId);
    }
    return false;
  };

  // Handle add to wishlist
  const handleAddToWishlist = async (e, productId) => {
    e.preventDefault();
    e.stopPropagation();
    if (!userInfo) {
      setModalShow(true);
      return;
    }
    try {
      const userDetails = {
        product_id: productId,
        user_id: userInfo?.data?.user?.id,
      };
      const data = await addWishList(userDetails);
      if (data.status) {
        dispatch(getWishListd(userDetails));
        toast.success("Product added to wish list successful...", { position: "bottom-right" });
      }
    } catch (error) {
      console.error("Add wishlist error:", error);
      toast.error("Failed to add to wishlist", { position: "bottom-right" });
    }
  };

  // Handle remove from wishlist
  const handleRemoveFromWishlist = async (e, productId) => {
    e.preventDefault();
    e.stopPropagation();
    if (!userInfo) {
      setModalShow(true);
      return;
    }
    try {
      const userDetails = {
        product_id: productId,
        user_id: userInfo?.data?.user?.id,
      };
      const data = await removeWishList(userDetails);
      if (data.status) {
        dispatch(getWishListd(userDetails));
        toast.success("Removed from wishlist!", { position: "bottom-right" });
      }
    } catch (error) {
      console.error("Remove wishlist error:", error);
      toast.error("Failed to remove from wishlist", { position: "bottom-right" });
    }
  };
  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  const updateSortby = (sort_by) => {
    const current = queryParameters.get('sort_by') || '';
    const next = new URLSearchParams(queryParameters);

    // Toggle: clicking the same active sort removes it
    if (current && current === sort_by) {
      next.delete('sort_by');
      setSortby('');
      setSortbylabel('');
    } else {
      next.set('sort_by', sort_by);
      setSortby(sort_by);
      if (sort_by == 'newest') {
        setSortbylabel('Latest');
      } else if (sort_by == 'popular') {
        setSortbylabel('Popular');
      } else if (sort_by == 'price_asc') {
        setSortbylabel('Price - Low to High');
      } else if (sort_by == 'price_desc') {
        setSortbylabel('Price - High to Low');
      } else if (sort_by == 'discount_desc') {
        setSortbylabel('Discount - High to Low');
      } else {
        setSortbylabel('');
      }
    }

    setSearchParams(next);
    setDropdownVisible((prevState) => !prevState);
  };

  // Campaign mobile sort chips: allow multi-select UI, but apply sorting based on last clicked
  const toggleSortChip = (sort_by) => {
    const currentlySelected = selectedSortChips.includes(sort_by);
    const nextSelected = currentlySelected
      ? selectedSortChips.filter((x) => x !== sort_by)
      : [...selectedSortChips, sort_by];

    setSelectedSortChips(nextSelected);

    const current = queryParameters.get('sort_by') || '';
    const next = new URLSearchParams(queryParameters);

    // If enabling this chip, make it the active sort (last clicked wins)
    if (!currentlySelected) {
      next.set('sort_by', sort_by);
      setSortby(sort_by);
      if (sort_by == 'newest') {
        setSortbylabel('Latest');
      } else if (sort_by == 'popular') {
        setSortbylabel('Popular');
      } else if (sort_by == 'price_asc') {
        setSortbylabel('Price - Low to High');
      } else if (sort_by == 'price_desc') {
        setSortbylabel('Price - High to Low');
      } else if (sort_by == 'discount_desc') {
        setSortbylabel('Discount - High to Low');
      } else {
        setSortbylabel('');
      }
    } else {
      // If disabling the currently-applied sort chip, keep other selected chips and promote last one
      if (current && current === sort_by) {
        const remaining = nextSelected.length > 0 ? nextSelected[nextSelected.length - 1] : null;
        if (remaining) {
          next.set('sort_by', remaining);
          setSortby(remaining);
          if (remaining == 'newest') {
            setSortbylabel('Latest');
          } else if (remaining == 'popular') {
            setSortbylabel('Popular');
          } else if (remaining == 'price_asc') {
            setSortbylabel('Price - Low to High');
          } else if (remaining == 'price_desc') {
            setSortbylabel('Price - High to Low');
          } else if (remaining == 'discount_desc') {
            setSortbylabel('Discount - High to Low');
          } else {
            setSortbylabel('');
          }
        } else {
          next.delete('sort_by');
          setSortby('');
          setSortbylabel('');
        }
      }
    }

    setSearchParams(next);
  };

  const updateSortbyFromModal = (sort_by) => {
    setSortby(sort_by);
    const newParams = new URLSearchParams(queryParameters);
    newParams.set('sort_by', sort_by);
    setSearchParams(newParams);

    if (sort_by == 'newest') {
      setSortbylabel('Latest');
    } else if (sort_by == 'popular') {
      setSortbylabel('Popular');
    } else if (sort_by == 'price_asc') {
      setSortbylabel('Price - Low to High');
    } else if (sort_by == 'price_desc') {
      setSortbylabel('Price - High to Low');
    } else if (sort_by == 'discount_desc') {
      setSortbylabel('Discount - High to Low');
    } else {
      setSortbylabel('Popular');
    }

    handleClose();
  };

  const appliedFilters = useMemo(() => {
    const params = queryParameters;
    const filters = [];

    const min = params.get('min_price');
    const max = params.get('max_price');
    if (min || max) {
      filters.push({
        key: 'price',
        label: `Price: ${min || '0'} - ${max || ''}`.trim(),
        remove: () => {
          const next = new URLSearchParams(params);
          next.delete('min_price');
          next.delete('max_price');
          setSearchParams(next);
        },
      });
    }

    params.forEach((value, key) => {
      if (key === 'min_price' || key === 'max_price') return;
      if (key === 'sort_by' || key === 'offset') return;
      if (!value) return;

      filters.push({
        key: `${key}:${value}`,
        label: value,
        remove: () => {
          const next = new URLSearchParams(params);
          next.delete(key);
          setSearchParams(next);
        },
      });
    });

    return filters;
  }, [queryParameters, setSearchParams]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMinPrice(queryParameters.get('min_price') || '300');
      setMaxPrice(queryParameters.get('max_price') || '100000');
    }, 300);
    return () => clearTimeout(timer);
  }, [queryParameters]);

  // Fetch default banner on component mount (only for base /category page)
  useEffect(() => {
    // Check if this is the base /category page (no specific filters)
    const hasSpecificFilter =
      queryParameters.get('category_id') ||
      queryParameters.get('occasion_id') ||
      queryParameters.get('designer_id') ||
      queryParameters.get('style_id') ||
      queryParameters.get('pattern_id') ||
      (queryParameters.get('edit_id') && queryParameters.get('edit_id') !== 'all') ||
      queryParameters.get('fabric_id') ||
      queryParameters.get('campaign') ||
      queryParameters.get('category_ids') ||
      queryParameters.get('occasion_ids') ||
      queryParameters.get('size_ids') ||
      queryParameters.get('color_ids');

    // Only fetch API banner for base /category page
    if (!hasSpecificFilter) {
      const fetchProductPageBanner = async () => {
        try {
          const response = await getProductPageBanner();
          const imageUrl =
            response?.data?.image_url ||
            response?.data?.image ||
            response?.data?.banner_image ||
            response?.banner?.image ||
            response?.banner ||
            response?.image;

          if (imageUrl) {
            setDefaultBannerImage(imageUrl);
            // Set banner immediately if currently showing default banner
            setbannerimage((currentBanner) => {
              if (currentBanner === Productbanner1) {
                return imageUrl;
              }
              return currentBanner;
            });
          }
        } catch (error) {
          console.error("Error fetching product page banner:", error);
        }
      };

      fetchProductPageBanner();
    }
  }, [queryParameters]);

  // Scroll hijacking removed - allow natural page scrolling
  // useEffect removed to prevent mouse hang issues

  useEffect(() => {
    async function getProductsList() {
      setLoading(true);

      // Trending view (mobile friendly), similar to Recently Viewed mode
      if (isTrendingMode) {
        try {
          const data = await recentproductList();
          const list = Array.isArray(data?.data) ? [...data.data] : [];

          const sortKeyFromUrl = queryParameters.get('sort_by') || '';
          if (sortKeyFromUrl === 'newest') {
            setSortbylabel('Latest');
          } else if (sortKeyFromUrl === 'popular') {
            setSortbylabel('Popular');
          } else if (sortKeyFromUrl === 'price_asc') {
            setSortbylabel('Price - Low to High');
          } else if (sortKeyFromUrl === 'price_desc') {
            setSortbylabel('Price - High to Low');
          } else if (sortKeyFromUrl === 'discount_desc') {
            setSortbylabel('Discount - High to Low');
          } else {
            setSortbylabel('');
          }

          const sortKey = queryParameters.get('sort_by') || 'popular';
          if (sortKey === 'price_asc') {
            list.sort((a, b) => (a?.saleprice || a?.price || 0) - (b?.saleprice || b?.price || 0));
          }
          if (sortKey === 'price_desc') {
            list.sort((a, b) => (b?.saleprice || b?.price || 0) - (a?.saleprice || a?.price || 0));
          }
          if (sortKey === 'discount_desc') {
            list.sort((a, b) => {
              const ad = a?.discount_price || a?.discount_amount || 0;
              const bd = b?.discount_price || b?.discount_amount || 0;
              return bd - ad;
            });
          }

          setProductsArr(list);
          setcatNamelabel('TRENDING PRODUCTS');
          setbannerimage(Productbanner1);
          setBannerLink('/');
        } catch (e) {
          console.error('Error fetching trending list:', e);
          setProductsArr([]);
        }
        setLoading(false);
        return;
      }

      if (isRecentlyViewedMode) {
        const list = Array.isArray(recentlyViewedProducts) ? [...recentlyViewedProducts] : [];

        const sortKey = queryParameters.get('sort_by') || 'popular';
        const sortKeyFromUrl = queryParameters.get('sort_by') || '';
        if (sortKeyFromUrl === 'newest') {
          setSortbylabel('Latest');
        } else if (sortKeyFromUrl === 'popular') {
          setSortbylabel('Popular');
        } else if (sortKeyFromUrl === 'price_asc') {
          setSortbylabel('Price - Low to High');
        } else if (sortKeyFromUrl === 'price_desc') {
          setSortbylabel('Price - High to Low');
        } else if (sortKeyFromUrl === 'discount_desc') {
          setSortbylabel('Discount - High to Low');
        } else {
          setSortbylabel('');
        }

        if (sortKey === 'price_asc') {
          list.sort((a, b) => (a?.saleprice || a?.price || 0) - (b?.saleprice || b?.price || 0));
        }
        if (sortKey === 'price_desc') {
          list.sort((a, b) => (b?.saleprice || b?.price || 0) - (a?.saleprice || a?.price || 0));
        }
        if (sortKey === 'discount_desc') {
          list.sort((a, b) => {
            const ad = a?.discount_price || a?.discount_amount || 0;
            const bd = b?.discount_price || b?.discount_amount || 0;
            return bd - ad;
          });
        }

        setProductsArr(list);
        setcatNamelabel('RECENTLY VIEWED');
        setbannerimage(Productbanner1);
        setBannerLink('/');
        setLoading(false);
        return;
      }

      if (queryParameters.get('sort_by') == 'newest') {
        setSortbylabel('Latest');
      } else if (queryParameters.get('sort_by') == 'popular') {
        setSortbylabel('Popular');
      } else if (queryParameters.get('sort_by') == 'price_asc') {
        setSortbylabel('Price - Low to High');
      } else if (queryParameters.get('sort_by') == 'price_desc') {
        setSortbylabel('Price - High to Low');
      } else if (queryParameters.get('sort_by') == 'discount_desc') {
        setSortbylabel('Discount - High to Low');
      } else {
        setSortbylabel('');
      }

      // Check if this is the base /category page (no specific filters)
      const hasSpecificFilter =
        queryParameters.get('category_id') ||
        queryParameters.get('occasion_id') ||
        queryParameters.get('designer_id') ||
        queryParameters.get('style_id') ||
        queryParameters.get('pattern_id') ||
        (queryParameters.get('edit_id') && queryParameters.get('edit_id') !== 'all') ||
        queryParameters.get('fabric_id') ||
        queryParameters.get('campaign') ||
        queryParameters.get('category_ids') ||
        queryParameters.get('occasion_ids') ||
        queryParameters.get('size_ids') ||
        queryParameters.get('color_ids');

      // Fetch default banner first if not already fetched (only for base page)
      let currentDefaultBanner = defaultBannerImage;
      if (!hasSpecificFilter && !currentDefaultBanner) {
        try {
          const bannerResponse = await getProductPageBanner();
          const imageUrl =
            bannerResponse?.data?.image_url ||
            bannerResponse?.data?.image ||
            bannerResponse?.data?.banner_image ||
            bannerResponse?.banner?.image ||
            bannerResponse?.banner ||
            bannerResponse?.image;

          if (imageUrl) {
            currentDefaultBanner = imageUrl;
            setDefaultBannerImage(imageUrl);
          } else {
            currentDefaultBanner = Productbanner1;
            setDefaultBannerImage(Productbanner1);
          }
        } catch (error) {
          console.error("Error fetching product page banner:", error);
          currentDefaultBanner = Productbanner1;
          setDefaultBannerImage(Productbanner1);
        }
      } else if (!hasSpecificFilter && currentDefaultBanner) {
        // Use already fetched banner
      } else {
        // For specific filters, don't use API banner
        currentDefaultBanner = Productbanner1;
      }

      // Fetch edit title and cover if edit_id is present
      const editId = queryParameters.get('edit_id');
      let editTitleFromMenu = null;
      let editCoverFromMenu = null;

      if (editId && editId !== 'all') {
        try {
          // First try to get edit data from edit_list API (preferred)
          const editListData = await getEditList();
          console.log("Edit list API response:", editListData); // Debug log

          if (editListData?.data && Array.isArray(editListData.data)) {
            const edit = editListData.data.find(e => e.id == editId || e.id == parseInt(editId));
            if (edit) {
              console.log("Found edit from edit_list API:", edit); // Debug log
              if (edit.title) {
                editTitleFromMenu = edit.title;
              }
              if (edit.cover && edit.cover !== '') {
                editCoverFromMenu = edit.cover;
              }
            }
          }

          // Fallback to menuList if edit_list API didn't provide the data
          if (!editCoverFromMenu || !editTitleFromMenu) {
            const menuData = await menuList();
            console.log("Menu data for edit cover (fallback):", menuData); // Debug log
            // Find the edit title and cover from menu data
            for (const campaign of menuData.campaigns || []) {
              if (campaign.edits && campaign.edits.length > 0) {
                const edit = campaign.edits.find(e => e.id == editId);
                if (edit) {
                  console.log("Found edit from menuList:", edit); // Debug log
                  if (!editTitleFromMenu && edit.title) {
                    editTitleFromMenu = edit.title;
                  }
                  // Get cover image from edit (check multiple possible field names)
                  if (!editCoverFromMenu) {
                    if (edit.cover && edit.cover !== '') {
                      editCoverFromMenu = edit.cover;
                    } else if (edit.cover_image && edit.cover_image !== '') {
                      editCoverFromMenu = edit.cover_image;
                    } else if (edit.image && edit.image !== '') {
                      editCoverFromMenu = edit.image;
                    } else if (edit.banner && edit.banner !== '') {
                      editCoverFromMenu = edit.banner;
                    } else if (edit.banner_image && edit.banner_image !== '') {
                      editCoverFromMenu = edit.banner_image;
                    }
                  }
                  if (editTitleFromMenu && editCoverFromMenu) {
                    break; // Found both, no need to continue
                  }
                }
              }
            }
          }

          console.log("Final edit cover:", editCoverFromMenu); // Debug log
        } catch (error) {
          console.error("Error fetching edit data:", error);
        }
      }

      products_list({
        offset: 0,
        category_id: queryParameters.get('category_id'),
        designer_id: queryParameters.get('designer_id'),
        style_id: queryParameters.get('style_id'),
        occasion_id: queryParameters.get('occasion_id'),
        pattern_id: queryParameters.get('pattern_id'),
        edit_id: queryParameters.get('edit_id'),
        fabric_id: queryParameters.get('fabric_id'),
        campaign_id: queryParameters.get('campaign'),
        sort_by: queryParameters.get('sort_by'),
        category_ids: queryParameters.get('category_ids'),
        occasion_ids: queryParameters.get('occasion_ids'),
        size_ids: queryParameters.get('size_ids'),
        color_ids: queryParameters.get('color_ids'),
        ready_to_ship: queryParameters.get('ready_to_ship'),
        min_price: queryParameters.get('min_price'),
        max_price: queryParameters.get('max_price'),
      })
        .then((data) => {
          let filteredProducts = data.products;
          if (queryParameters.get('min_price') || queryParameters.get('max_price')) {
            const min = parseFloat(queryParameters.get('min_price')) || 0;
            const max = parseFloat(queryParameters.get('max_price')) || Infinity;
            filteredProducts = data.products.filter(
              (product) => product.saleprice >= min && product.saleprice <= max
            );
          }
          if (queryParameters.get('sort_by') == 'price_asc') {
            filteredProducts.sort((a, b) => a.saleprice - b.saleprice);
          }
          if (queryParameters.get('sort_by') == 'price_desc') {
            filteredProducts.sort((a, b) => b.saleprice - a.saleprice);
          }
          if (queryParameters.get('sort_by') == 'discount_desc') {
            filteredProducts.sort((a, b) => b.discount_price - a.discount_price);
          }
          setProductsArr(filteredProducts);

          // Set banner image & link
          // Priority: API response cover > menuList edit cover > API default banner > static default
          if (hasSpecificFilter && data?.datadet) {
            // Use assigned banner for specific category/occasion/etc. from API response
            if (data.datadet.cover && data.datadet.cover !== '') {
              setbannerimage(data.datadet.cover);
            } else {
              setbannerimage(Productbanner1);
            }

            // If API returns a campaign link for this banner, use it
            if (data.datadet.campaign_link && data.datadet.campaign_link !== '') {
              setBannerLink(data.datadet.campaign_link);
            } else {
              setBannerLink('/');
            }
          } else if (editId && editId !== 'all' && editCoverFromMenu) {
            // Use edit cover from menuList if edit_id is present and API didn't provide cover
            setbannerimage(editCoverFromMenu);
            setBannerLink('/');
          } else if (!hasSpecificFilter) {
            // Use API banner only for base /category page
            setbannerimage(currentDefaultBanner || Productbanner1);
            setBannerLink('/');
          } else {
            // Fallback to default
            setbannerimage(Productbanner1);
            setBannerLink('/');
          }

          // Set category/edit name label
          let nameLabel = 'ALL';

          // Priority: API response > menuList > default
          if (data?.datadet?.title && data?.datadet?.title != '') {
            nameLabel = data.datadet.title;
          } else if (data?.edit?.title && data?.edit?.title != '') {
            // Check for edit title in response
            nameLabel = data.edit.title;
          } else if (data?.edit_title && data?.edit_title != '') {
            // Alternative edit title field
            nameLabel = data.edit_title;
          } else if (editTitleFromMenu) {
            // Use title from menuList if API didn't provide it
            nameLabel = editTitleFromMenu;
          }

          setcatNamelabel(nameLabel);
          // Store category name in sessionStorage for header to use
          // Always store, including 'ALL' for base category page
          if (nameLabel) {
            sessionStorage.setItem('categoryPageTitle', nameLabel);
          }

          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching product list:", error);
          setLoading(false);
        });
    }
    getProductsList();
  }, [queryParameters, isRecentlyViewedMode, isTrendingMode, recentlyViewedProducts]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 575px)');
    let lastScrollY = window.scrollY;
    let ticking = false;
    const threshold = 12;

    const update = () => {
      const currentY = window.scrollY;
      const delta = currentY - lastScrollY;

      if (!mediaQuery.matches) {
        setIsMobileHeaderBarHidden(false);
        lastScrollY = currentY;
        ticking = false;
        return;
      }

      if (Math.abs(delta) >= threshold) {
        if (delta > 0 && currentY > 120) {
          setIsMobileHeaderBarHidden(true);
        } else {
          setIsMobileHeaderBarHidden(false);
        }
        lastScrollY = currentY;
      }

      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    };

    const onMediaChange = () => {
      if (!mediaQuery.matches) setIsMobileHeaderBarHidden(false);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', onMediaChange);
    } else {
      mediaQuery.addListener(onMediaChange);
    }

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', onMediaChange);
      } else {
        mediaQuery.removeListener(onMediaChange);
      }
    };
  }, []);

  return (
    loading ? (
      <Loader />
    ) : (
      <>
        <div>
          <div className={`App other-page-top ${showSortChips ? 'campaignCategory' : ''}`}>

            <div className="BreakPointContainer AppContent">
              <div className="layout ProductList align-start">
                <Filter />
                <div ref={productListContainerRef} className="custom-flex Productpage ProductListContainer minWidth0">
                  <div className="prel">
                    <div className={`Banner m-t-20 prel ${(!queryParameters.get('campaign') && !queryParameters.get('category_id') && !queryParameters.get('occasion_id') && !queryParameters.get('designer_id') && !queryParameters.get('style_id') && !queryParameters.get('pattern_id') && !queryParameters.get('edit_id') && !queryParameters.get('fabric_id')) || queryParameters.get('pattern_id') === 'all' || queryParameters.get('occasion_id') === 'all' ? 'category-base-banner' : ''}`}>
                      <Link to={bannerLink || '/'}>
                        <div className="timerPosition layout align-center justify-end">
                          <div className="timer-banner-container">
                            <div className="layout align-center justify-center full-height">
                              <div className="small-font">  </div>
                            </div>
                          </div>
                        </div>
                        <div className="DynamicHeightLoaderWrapper" style={{ paddingTop: '5%' }}>
                          <div className="DynamicHeightLoader layout row align-center justify-center" style={{ paddingTop: '20%' }}>
                            <img src={bannerimage} alt="logo" className='img-resp DynamicHeightLoaderImage' style={{ padding: '0px' }} />
                          </div>
                          <div className="animated-bg-placeholder"></div>
                        </div>
                      </Link>
                    </div>
                    <div className="CategoryHeader layout justify-space-between align-center">
                      <div className="CategoryHeaderTopRow layout align-center justify-space-between">
                        <div className="layout align-center">
                          <h4 className="CategoryTitle ellipsis demi-bold">{catNamelabel}</h4>
                          <p className="CategoryProductCount h7 font-normal">({productsArr.length} products)</p>
                        </div>
                      </div>

                      <div className={`CategoryHeaderBottomRow layout align-center justify-space-between${isMobileHeaderBarHidden ? ' is-hidden-mobile' : ''}`}>


                        <div className="CategoryHeaderFilters">
                          <div className={`dd-wrapper ${showSortChips ? 'campaign-dd-wrapper' : ''}`}>
                            <div className="dd-header" onClick={toggleDropdown}>
                              <div>
                                <span className="dd-header-sort-text">Sort by: </span>
                                <span className="dd-header-title demi-bold">
                                  {sortBylabel || 'Select'}
                                </span>
                                {/* <Select
                              defaultValue={selectedOption}
                              onChange={setSelectedOption}
                              options={options}
                            />   */}
                              </div>
                              <span className={`arrow-icon m-r-5 ${isDropdownVisible ? 'arrow-down-icon' : 'arrow-up-icon'}`}></span>
                            </div>

                            {isDropdownVisible && (
                              <ul className='dd-list bold'>
                                <li className={`dd-list-item font-normal ${queryParameters.get('sort_by') == 'popular' ? `selected` : ``}`} onClick={() => updateSortby('popular')} > Popular </li>
                                <li className={`dd-list-item font-normal ${queryParameters.get('sort_by') == 'newest' ? `selected` : ``}`} onClick={() => updateSortby('newest')}> Latest </li>
                                <li className={`dd-list-item font-normal ${queryParameters.get('sort_by') == 'price_asc' ? `selected` : ``}`} onClick={() => updateSortby('price_asc')}> Price - Low to High </li>
                                <li className={`dd-list-item font-normal ${queryParameters.get('sort_by') == 'price_desc' ? `selected` : ``}`} onClick={() => updateSortby('price_desc')}> Price - High to Low </li>
                                <li className={`dd-list-item font-normal ${queryParameters.get('sort_by') == 'discount_desc' ? `selected` : ``}`} onClick={() => updateSortby('discount_desc')}> Discount - High to Low </li>
                              </ul>
                            )}

                          </div>
                          {showSortChips && (
                            <div className="campaign-mobile-sort">
                              {[
                                { value: 'popular', label: 'Popular' },
                                { value: 'newest', label: 'Sort by latest' },
                                // { value: 'price_asc', label: 'Price - Low to High' },
                                // { value: 'price_desc', label: 'Price - High to Low' },
                                { value: 'discount_desc', label: 'Discount - High to Low' },
                              ].map((option) => {
                                const isActive = selectedSortChips.includes(option.value);
                                return (
                                  <button
                                    key={option.value}
                                    type="button"
                                    className={`campaign-sort-chip${isActive ? ' active' : ''}`}
                                    onClick={() => toggleSortChip(option.value)}
                                  >
                                    {option.label}
                                  </button>
                                );
                              })}
                            </div>
                          )}
                          <div className={`mobile_filter${hasAnyActiveFilters ? ' active' : ''}`} onClick={handleShow}>
                            <CiFilter />
                          </div>
                          {/* Mobile Filter  */}
                          <Modal className="filter-model ProductInfoModal fliter-model " show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                              {/* <Modal.Title>Filter</Modal.Title> */}
                            </Modal.Header>
                            <Modal.Body className="singleproduct">
                              <Tabs id="controlled-tab-example" className="mb-3 layout custom-tailored-header row">
                                <Tab eventKey="home" title="FILTER BY">
                                  <div className="filter-div">
                                    <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                                      <a className={`nav-link ${activeTab === 'v-pills-home' ? 'active' : ''}`} id="v-pills-home-tab" data-toggle="pill" href="#v-pills-home" role="tab" aria-controls="v-pills-home" aria-selected={activeTab === 'v-pills-home'} onClick={() => handleTabClick('v-pills-home')}>READY TO SHIP</a>
                                      <a className={`nav-link ${activeTab === 'v-pills-profile' ? 'active' : ''}`} id="v-pills-profile-tab" data-toggle="pill" href="#v-pills-profile" role="tab" aria-controls="v-pills-profile" aria-selected={activeTab === 'v-pills-profile'} onClick={() => handleTabClick('v-pills-profile')}>CATEGORY</a>
                                      <a className={`nav-link ${activeTab === 'v-pills-messages' ? 'active' : ''}`} id="v-pills-messages-tab" data-toggle="pill" href="#v-pills-messages" role="tab" aria-controls="v-pills-messages" aria-selected={activeTab === 'v-pills-messages'} onClick={() => handleTabClick('v-pills-messages')}>SIZE</a>
                                      <a className={`nav-link ${activeTab === 'v-pills-settings' ? 'active' : ''}`} id="v-pills-settings-tab" data-toggle="pill" href="#v-pills-settings" role="tab" aria-controls="v-pills-settings" aria-selected={activeTab === 'v-pills-settings'} onClick={() => handleTabClick('v-pills-settings')}>COLOR</a>
                                      <a className={`nav-link ${activeTab === 'v-pills-SHIPPING-TIME' ? 'active' : ''}`} id="v-pills-SHIPPING-TIME-tab" data-toggle="pill" href="#v-pills-SHIPPING-TIME" role="tab" aria-controls="v-pills-SHIPPING-TIME" aria-selected={activeTab === 'v-pills-SHIPPING-TIME'} onClick={() => handleTabClick('v-pills-SHIPPING-TIME')}>SHIPPING TIME</a>
                                      <a className={`nav-link ${activeTab === 'v-pills-PRICE' ? 'active' : ''}`} id="v-pills-PRICE-tab" data-toggle="pill" href="#v-pills-PRICE" role="tab" aria-controls="v-pills-PRICE" aria-selected={activeTab === 'v-pills-PRICE'} onClick={() => handleTabClick('v-pills-PRICE')}>PRICE</a>
                                    </div>
                                    <div className="tab-content" id="v-pills-tabContent">
                                      <div className={`tab-pane fade ${activeTab === 'v-pills-home' ? 'show active' : ''}`} id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">
                                        <div className="CheckboxList">
                                          <div className="CheckboxListOptions layout row align-start wrap">
                                            <div className="flex xs12 CheckboxColorOptions">
                                              <div className="PslCheckbox flex">
                                                <label>
                                                  <input
                                                    type="checkbox"
                                                    name="ready_to_ship"
                                                    className="PslCheckboxInput"
                                                    checked={pendingReadyToShip}
                                                    onChange={() => setPendingReadyToShip((v) => !v)}
                                                  />
                                                  <span className="PslCheckboxCheckmark"></span>
                                                  <span className="PslCheckboxText m-l-5 m-r-5 ellipsis p2">Ready To Ship</span>
                                                  <span className='PslCheckboxCount p2'>
                                                    (39)
                                                  </span>
                                                </label>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className={`tab-pane fade ${activeTab === 'v-pills-profile' ? 'show active' : ''}`} id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab">
                                        <div className="CheckboxList">
                                          {/* <h5 className="CheckboxListTitle demi-bold">Category</h5> */}
                                          <div className="CheckboxListSearch">
                                            <i className="fa fa-search search-icon" aria-hidden="true"></i>
                                            <input type="text" value="" placeholder="Search" />
                                          </div>
                                          <div className="CheckboxListOptions layout row align-start wrap">
                                            {filterCategories.map((c) => {
                                              const idStr = String(c.id);
                                              const checked = pendingCategoryIds.includes(idStr);
                                              return (
                                                <div key={c.id} className="flex xs12 CheckboxColorOptions">
                                                  <div className="PslCheckbox flex">
                                                    <label>
                                                      <input
                                                        type="checkbox"
                                                        name={`category-${c.id}`}
                                                        className="PslCheckboxInput"
                                                        checked={checked}
                                                        onChange={() => togglePendingId(setPendingCategoryIds, c.id)}
                                                      />
                                                      <span className="PslCheckboxCheckmark"></span>
                                                      <span className="PslCheckboxText m-l-5 m-r-5 ellipsis p2">{c.title}</span>
                                                      <span className="PslCheckboxCount p2"></span>
                                                    </label>
                                                  </div>
                                                </div>
                                              );
                                            })}
                                          </div>
                                        </div>
                                      </div>
                                      <div className={`tab-pane fade ${activeTab === 'v-pills-messages' ? 'show active' : ''}`} id="v-pills-messages" role="tabpanel" aria-labelledby="v-pills-messages-tab">
                                        <div className="CheckboxList">
                                          {/* <h5 className="CheckboxListTitle demi-bold">Size</h5> */}
                                          <div className="CheckboxListOptions layout row align-start wrap">
                                            {[...filterSizes].sort((a, b) => sizeRank(a.size) - sizeRank(b.size)).map((s) => {
                                              const idStr = String(s.id);
                                              const checked = pendingSizeIds.includes(idStr);
                                              return (
                                                <div key={s.id} className="flex xs12 CheckboxColorOptions">
                                                  <div className="PslCheckbox flex">
                                                    <label>
                                                      <input
                                                        type="checkbox"
                                                        name={`size-${s.id}`}
                                                        className="PslCheckboxInput"
                                                        checked={checked}
                                                        onChange={() => togglePendingId(setPendingSizeIds, s.id)}
                                                      />
                                                      <span className="PslCheckboxCheckmark"></span>
                                                      <span className="PslCheckboxText m-l-5 m-r-5 ellipsis p2">{s.size}</span>
                                                      <span className="PslCheckboxCount p2"></span>
                                                    </label>
                                                  </div>
                                                </div>
                                              );
                                            })}
                                          </div>
                                        </div>
                                      </div>
                                      <div className={`tab-pane fade ${activeTab === 'v-pills-settings' ? 'show active' : ''}`} id="v-pills-settings" role="tabpanel" aria-labelledby="v-pills-settings-tab">
                                        <div className="CheckboxList">
                                          {/* <h5 className="CheckboxListTitle demi-bold">Color</h5> */}
                                          <div className="CheckboxListOptions layout row align-start wrap">
                                            {filterColors.map((c) => {
                                              const idStr = String(c.id);
                                              const checked = pendingColorIds.includes(idStr);
                                              return (
                                                <div key={c.id} className="flex xs12 CheckboxColorOptions">
                                                  <div className="PslCheckbox flex">
                                                    <label>
                                                      <input
                                                        type="checkbox"
                                                        name={`color-${c.id}`}
                                                        className="PslCheckboxInput"
                                                        checked={checked}
                                                        onChange={() => togglePendingId(setPendingColorIds, c.id)}
                                                      />
                                                      <span className="PslCheckboxCheckmark"></span>
                                                      <span className="PslCheckboxText m-l-5 m-r-5 ellipsis p2">{c.title}</span>
                                                      <span className="PslCheckboxCount p2"></span>
                                                    </label>
                                                  </div>
                                                </div>
                                              );
                                            })}
                                          </div>
                                        </div>
                                      </div>
                                      {/* <div className={`tab-pane fade ${activeTab === 'v-pills-SHIPPING-TIME' ? 'show active' : ''}`} id="v-pills-SHIPPING-TIME" role="tabpanel" aria-labelledby="v-pills-SHIPPING-TIME-tab">
                                        <div className="CheckboxList">
                                          <h5 className="CheckboxListTitle demi-bold">SHIPPING TIME</h5>
                                          <div className="CheckboxListOptions layout row align-start wrap">
                                            <div className="flex xs12 CheckboxColorOptions">
                                              <div className="PslCheckbox flex">
                                                <label>
                                                  <input type="checkbox" name="5" className="PslCheckboxInput" />
                                                  <span className="PslCheckboxCheckmark"></span>
                                                  <span className="PslCheckboxText m-l-5 m-r-5 ellipsis p2">48 Hours</span>
                                                  <span className='PslCheckboxCount p2'>
                                                    (31951)
                                                  </span>
                                                </label>
                                              </div>
                                            </div>
                                            <div className="flex xs12 CheckboxColorOptions">
                                              <div className="PslCheckbox flex">
                                                <label>
                                                  <input type="checkbox" name="5" className="PslCheckboxInput" />
                                                  <span className="PslCheckboxCheckmark"></span>
                                                  <span className="PslCheckboxText m-l-5 m-r-5 ellipsis p2">7 Days</span>
                                                  <span className='PslCheckboxCount p2'>
                                                    (21951)
                                                  </span>
                                                </label>
                                              </div>
                                            </div>
                                            <div className="flex xs12 CheckboxColorOptions">
                                              <div className="PslCheckbox flex">
                                                <label>
                                                  <input type="checkbox" name="5" className="PslCheckboxInput" />
                                                  <span className="PslCheckboxCheckmark"></span>
                                                  <span className="PslCheckboxText m-l-5 m-r-5 ellipsis p2">10 Days</span>
                                                  <span className='PslCheckboxCount p2'>
                                                    (11951)
                                                  </span>
                                                </label>
                                              </div>
                                            </div>
                                            <div className="flex xs12 CheckboxColorOptions">
                                              <div className="PslCheckbox flex">
                                                <label>
                                                  <input type="checkbox" name="5" className="PslCheckboxInput" />
                                                  <span className="PslCheckboxCheckmark"></span>
                                                  <span className="PslCheckboxText m-l-5 m-r-5 ellipsis p2">1-2 Weeks</span>
                                                  <span className='PslCheckboxCount p2'>
                                                    (41951)
                                                  </span>
                                                </label>
                                              </div>
                                            </div>
                                            <div className="flex xs12 CheckboxColorOptions">
                                              <div className="PslCheckbox flex">
                                                <label>
                                                  <input type="checkbox" name="5" className="PslCheckboxInput" />
                                                  <span className="PslCheckboxCheckmark"></span>
                                                  <span className="PslCheckboxText m-l-5 m-r-5 ellipsis p2">2-3 Weeks</span>
                                                  <span className='PslCheckboxCount p2'>
                                                    (31951)
                                                  </span>
                                                </label>
                                              </div>
                                            </div>
                                            <div className="flex xs12 CheckboxColorOptions">
                                              <div className="PslCheckbox flex">
                                                <label>
                                                  <input type="checkbox" name="5" className="PslCheckboxInput" />
                                                  <span className="PslCheckboxCheckmark"></span>
                                                  <span className="PslCheckboxText m-l-5 m-r-5 ellipsis p2">3-4 Weeks</span>
                                                  <span className='PslCheckboxCount p2'>
                                                    (31951)
                                                  </span>
                                                </label>
                                              </div>
                                            </div>
                                            <div className="flex xs12 CheckboxColorOptions">
                                              <div className="PslCheckbox flex">
                                                <label>
                                                  <input type="checkbox" name="5" className="PslCheckboxInput" />
                                                  <span className="PslCheckboxCheckmark"></span>
                                                  <span className="PslCheckboxText m-l-5 m-r-5 ellipsis p2">4-5 Weeks</span>
                                                  <span className='PslCheckboxCount p2'>
                                                    (31951)
                                                  </span>
                                                </label>
                                              </div>
                                            </div>
                                            <div className="flex xs12 CheckboxColorOptions">
                                              <div className="PslCheckbox flex">
                                                <label>
                                                  <input type="checkbox" name="5" className="PslCheckboxInput" />
                                                  <span className="PslCheckboxCheckmark"></span>
                                                  <span className="PslCheckboxText m-l-5 m-r-5 ellipsis p2">Above 5 Weeks</span>
                                                  <span className='PslCheckboxCount p2'>
                                                    (61951)
                                                  </span>
                                                </label>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div> */}
                                      <div className={`tab-pane fade ${activeTab === 'v-pills-PRICE' ? 'show active' : ''}`} id="v-pills-PRICE" role="tabpanel" aria-labelledby="v-pills-PRICE-tab">
                                        <div className="PriceFilterContainer CheckboxList">
                                          <div className="layout justify-space-between align-center CheckboxListTitle">
                                            <h5 className="demi-bold">Price</h5>
                                          </div>
                                          <div className="layout">
                                            <div className="flex xs5">
                                              <p className="m-b-5 CurrencySymbol m-l-12 p2">Price From</p>
                                              <div className="layout align-center">
                                                <span className="m-r-5 CurrencySymbol p2"><i className="fa fa-inr" style={{ fontSize: '13px' }}></i></span>
                                                <div className="layout">
                                                  <input
                                                    type="number"
                                                    value={minPrice}
                                                    onChange={(e) => setMinPrice(e.target.value)}
                                                    placeholder="Min"
                                                    className="full-width p2"
                                                  />
                                                </div>
                                              </div>
                                            </div>
                                            <div className="flex xs6 offset-xs1">
                                              <p className="m-b-5 CurrencySymbol m-l-12 p2">Price To</p>
                                              <div className="layout align-center">
                                                <span className="m-r-5 CurrencySymbol p2"><i className="fa fa-inr" style={{ fontSize: '13px' }}></i></span>
                                                <div className="layout">
                                                  <input
                                                    type="number"
                                                    value={maxPrice}
                                                    onChange={(e) => setMaxPrice(e.target.value)}
                                                    placeholder="Max"
                                                    className="full-width p2"
                                                  />
                                                </div>
                                              </div>
                                            </div>
                                          </div>

                                          <div className="PriceSliderWrapper">
                                            <ReactSlider
                                              className="PriceSlider"
                                              thumbClassName="PriceSliderThumb"
                                              trackClassName="PriceSliderTrack"
                                              min={0}
                                              max={100000}
                                              orientation="vertical"
                                              invert
                                              pearling
                                              minDistance={0}
                                              value={(() => {
                                                const minV = Number(minPrice);
                                                const maxV = Number(maxPrice);
                                                const safeMin = Number.isFinite(minV) ? minV : 0;
                                                const safeMax = Number.isFinite(maxV) ? maxV : 100000;
                                                return [Math.min(safeMin, safeMax), Math.max(safeMin, safeMax)];
                                              })()}
                                              onChange={(values) => {
                                                const [a, b] = values;
                                                setMinPrice(String(a));
                                                setMaxPrice(String(b));
                                              }}
                                              renderTrack={(props, state) => (
                                                <div
                                                  {...props}
                                                  className={`${props.className} PriceSliderTrack-${state.index}`}
                                                />
                                              )}
                                              renderThumb={(props) => (
                                                <div {...props}>
                                                  <img
                                                    className="PriceSliderThumbDot"
                                                    src="https://www.perniaspopupshop.com/public/icons/price-slider-dot.svg"
                                                    alt=""
                                                  />
                                                </div>
                                              )}
                                            />
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </Tab>
                                <Tab eventKey="profile" title="SORT BY">
                                  <div className="layout sorting-dialog column">
                                    <div className="sorting-list">
                                      <div className="borderLine-thin"></div>
                                      {(() => {
                                        const currentSort = (pendingSort || queryParameters.get('sort_by') || sortBy || '').toLowerCase();
                                        const isActive = (val) => currentSort === val;
                                        return (
                                          <>
                                            <h3>
                                              <div
                                                role="button"
                                                tabIndex={0}
                                                onClick={() => setPendingSort('popular')}
                                                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setPendingSort('popular')}
                                                className={`sorting-list-item lh-22 font-normal ${isActive('popular') ? 'orat-color' : ''}`}
                                              >
                                                Popular
                                              </div>
                                              <div className="borderLine-thin"></div>
                                            </h3>
                                            <h3>
                                              <div
                                                role="button"
                                                tabIndex={0}
                                                onClick={() => setPendingSort('newest')}
                                                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setPendingSort('newest')}
                                                className={`sorting-list-item lh-22 font-normal ${isActive('newest') ? 'orat-color' : ''}`}
                                              >
                                                Latest
                                              </div>
                                              <div className="borderLine-thin"></div>
                                            </h3>
                                            <h3>
                                              <div
                                                role="button"
                                                tabIndex={0}
                                                onClick={() => setPendingSort('price_asc')}
                                                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setPendingSort('price_asc')}
                                                className={`sorting-list-item lh-22 font-normal ${isActive('price_asc') ? 'orat-color' : ''}`}
                                              >
                                                Price - Low to High
                                              </div>
                                              <div className="borderLine-thin"></div>
                                            </h3>
                                            <h3>
                                              <div
                                                role="button"
                                                tabIndex={0}
                                                onClick={() => setPendingSort('price_desc')}
                                                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setPendingSort('price_desc')}
                                                className={`sorting-list-item lh-22 font-normal ${isActive('price_desc') ? 'orat-color' : ''}`}
                                              >
                                                Price - High to Low
                                              </div>
                                              <div className="borderLine-thin"></div>
                                            </h3>
                                            <h3>
                                              <div
                                                role="button"
                                                tabIndex={0}
                                                onClick={() => setPendingSort('discount_desc')}
                                                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setPendingSort('discount_desc')}
                                                className={`sorting-list-item lh-22 font-normal ${isActive('discount_desc') ? 'orat-color' : ''}`}
                                              >
                                                Discount - High to Low
                                              </div>
                                              <div className="borderLine-thin"></div>
                                            </h3>
                                          </>
                                        );
                                      })()}
                                    </div>
                                  </div>
                                </Tab>
                                <Tab eventKey="sort" title="SORT BY">
                                  <div className="filter-div">
                                    <div className="tab-content" style={{ width: '100%' }}>
                                      <div className="tab-pane fade show active">
                                        <div className="CheckboxList">
                                          <div className="CheckboxListOptions layout row align-start wrap">
                                            {[
                                              { value: 'popular', label: 'Popular' },
                                              { value: 'newest', label: 'Latest' },
                                              { value: 'price_asc', label: 'Price - Low to High' },
                                              { value: 'price_desc', label: 'Price - High to Low' },
                                              { value: 'discount_desc', label: 'Discount - High to Low' },
                                            ].map((opt) => {
                                              // const currentSort = queryParameters.get('sort_by') || sortBy;
                                              // const checked = currentSort === opt.value;
                                              const currentSort = pendingSort || queryParameters.get('sort_by') || sortBy;
                                              const checked = currentSort === opt.value;
                                              return (
                                                <div key={opt.value} className="flex xs12 CheckboxColorOptions">
                                                  <div className="PslCheckbox flex">
                                                    <label>
                                                      <input
                                                        type="checkbox"
                                                        name="sort_by"
                                                        className="PslCheckboxInput"
                                                        checked={checked}
                                                        // onChange={() => updateSortbyFromModal(opt.value)}
                                                        onChange={() => setPendingSort(opt.value)}
                                                      />
                                                      <span className="PslCheckboxCheckmark"></span>
                                                      <span className="PslCheckboxText m-l-5 m-r-5 ellipsis p2">{opt.label}</span>
                                                    </label>
                                                  </div>
                                                </div>
                                              );
                                            })}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </Tab>
                              </Tabs>
                            </Modal.Body>
                            <Modal.Footer className="modal_fiter">
                              <Button
                                className="first_fiter"
                                variant="secondary"
                                onClick={() => {
                                  setMinPrice('');
                                  setMaxPrice('');
                                  setSearchParams({});
                                  handleClose();
                                }}
                              >
                                CLEAR ALL
                              </Button>
                              <Button
                                variant="primary"
                                onClick={() => {
                                  const newParams = new URLSearchParams(queryParameters);
                                  if (minPrice) newParams.set('min_price', minPrice);
                                  else newParams.delete('min_price');
                                  if (maxPrice) newParams.set('max_price', maxPrice);
                                  else newParams.delete('max_price');

                                  if (pendingSizeIds.length > 0) newParams.set('size_ids', pendingSizeIds.join('-'));
                                  else newParams.delete('size_ids');

                                  if (pendingColorIds.length > 0) newParams.set('color_ids', pendingColorIds.join('-'));
                                  else newParams.delete('color_ids');

                                  // if (pendingCategoryIds.length > 0) newParams.set('category_ids', pendingCategoryIds.join('-'));
                                  // else newParams.delete('category_ids');
                                  if (pendingCategoryIds.length > 0) newParams.set('category_ids', pendingCategoryIds.join('-'));
                                  else newParams.delete('category_ids');
                                  if (pendingReadyToShip) newParams.set('ready_to_ship', '1');
                                  else newParams.delete('ready_to_ship');
                                  if (pendingSort) newParams.set('sort_by', pendingSort);
                                  else newParams.delete('sort_by');

                                  setSearchParams(newParams);
                                  handleClose();
                                }}
                              >
                                APPLY
                              </Button>
                            </Modal.Footer>
                          </Modal>
                        </div>
                      </div>
                      {(hasAnyActiveFilters || isRecentlyViewedMode) && (
                        <div className="ActiveFiltersBar layout align-center">
                          <div className="ActiveFiltersChips layout align-center wrap">
                            {filterCategories
                              .filter((c) => selectedCategoryIds.includes(String(c.id)))
                              .map((c) => (
                                <span key={`cat-${c.id}`} className="ActiveFilterChip p3 demi-bold">
                                  <span className="ActiveFilterChipLabel">{c.title}</span>
                                  <button
                                    type="button"
                                    className="ActiveFilterChipClose"
                                    aria-label={`Remove ${c.title}`}
                                    onClick={() => removeHeaderFilterValue('category_ids', c.id)}
                                  >
                                    ×
                                  </button>
                                </span>
                              ))}

                            {filterColors
                              .filter((c) => selectedColorIds.includes(String(c.id)))
                              .map((c) => (
                                <span key={`color-${c.id}`} className="ActiveFilterChip p3 demi-bold">
                                  <span className="ActiveFilterChipLabel">{c.title}</span>
                                  <button
                                    type="button"
                                    className="ActiveFilterChipClose"
                                    aria-label={`Remove ${c.title}`}
                                    onClick={() => removeHeaderFilterValue('color_ids', c.id)}
                                  >
                                    ×
                                  </button>
                                </span>
                              ))}

                            {filterSizes
                              .filter((s) => selectedSizeIds.includes(String(s.id)))
                              .map((s) => (
                                <span key={`size-${s.id}`} className="ActiveFilterChip p3 demi-bold">
                                  <span className="ActiveFilterChipLabel">{s.size}</span>
                                  <button
                                    type="button"
                                    className="ActiveFilterChipClose"
                                    aria-label={`Remove ${s.size}`}
                                    onClick={() => removeHeaderFilterValue('size_ids', s.id)}
                                  >
                                    ×
                                  </button>
                                </span>
                              ))}

                            {isReadyToShipSelected && (
                              <span className="ActiveFilterChip p3 demi-bold">
                                <span className="ActiveFilterChipLabel">Ready To Ship</span>
                                <button
                                  type="button"
                                  className="ActiveFilterChipClose"
                                  aria-label="Remove Ready To Ship"
                                  onClick={() => {
                                    const newParams = new URLSearchParams(queryParameters);
                                    newParams.delete('ready_to_ship');
                                    setSearchParams(newParams);
                                  }}
                                >
                                  ×
                                </button>
                              </span>
                            )}

                            <button
                              type="button"
                              className="ActiveFiltersClear p3 demi-bold"
                              onClick={clearAllHeaderFilters}
                            >
                              CLEAR
                            </button>
                          </div>
                        </div>
                      )}

                    </div>
                    <div className={`layout wrap align-start all_product ${queryParameters.get('campaign') ? 'campaign-product-list' : ''}`}>
                      {productsArr && productsArr.length > 0 ? (
                        <>
                          {productsArr && productsArr.length > 0 && productsArr.map((product, index) => (
                            <div key={index} className='category-product pr-3'>
                              <div className="category-div">
                                <Link to={`/products/productdetails/${product.id}`} className='ProductCard'>
                                  <div className="ProductCardImageWrapper" style={{ position: 'relative' }}>
                                    <div className="ProductImageWrapper">
                                      <div className="FirstProductImage">
                                        <div className="DynamicHeightLoaderWrapper" style={{ paddingTop: '38%' }}>
                                          <div className="DynamicHeightLoader layout row align-center justify-center" style={{ paddingTop: '100%' }}>
                                            <img src={product.product_thumbail} alt="logo" className='img-resp DynamicHeightLoaderImage' style={{ padding: '0px' }} />
                                          </div>
                                          <div className="animated-bg-placeholder"></div>
                                        </div>
                                      </div>
                                      <div className="HoverProductImage">
                                        <div className="DynamicHeightLoaderWrapper" style={{ paddingTop: '38%' }}>
                                          <div className="DynamicHeightLoader layout row align-center justify-center" style={{ paddingTop: '100%' }}>
                                            <img src={product.product_back_image} alt="logo" className='img-resp DynamicHeightLoaderImage' style={{ padding: '0px' }} />
                                          </div>
                                          <div className="animated-bg-placeholder"></div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="product-wishlist-icon" style={{ position: 'absolute', top: '8px', right: '8px', zIndex: 2 }}>
                                      {isProductInWishlist(product.id) ? (
                                        <button
                                          onClick={(e) => handleRemoveFromWishlist(e, product.id)}
                                          style={{
                                            background: 'transparent',
                                            border: 'none',
                                            cursor: 'pointer',
                                            padding: '6px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                          }}
                                        >
                                          <BsHeartFill style={{ color: '#e83647', fontSize: '20px' }} />
                                        </button>
                                      ) : (
                                        <button
                                          onClick={(e) => handleAddToWishlist(e, product.id)}
                                          style={{
                                            background: 'transparent',
                                            border: 'none',
                                            cursor: 'pointer',
                                            padding: '6px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                          }}
                                        >
                                          <BsHeart style={{ color: '#ffffff', fontSize: '20px' }} />
                                        </button>
                                      )}
                                    </div>
                                  </div>
                                  <div className="ProductCardBottom">
                                    <h6 className="ProductCardTitle ellipsis demi-bold">{product.product_title}</h6>
                                    <p className="ProductCardDescription p2 ellipsis-two-line">{product.product_short_description}</p>
                                    <div>
                                      <div className="ProductPrice h6">
                                        <span className='SpecialPrice  demi-bold ' > <i className="fa fa-inr" style={{ fontSize: '13px' }}></i> {formatPrice((product?.saleprice > 0 ? product?.saleprice : product?.price), { showSymbol: false })} </span>
                                        {product?.discount_amount > 0 && (<span className='InitialPrice'> <i className="fa fa-inr" style={{ fontSize: '13px' }}></i> {formatPrice(product?.price, { showSymbol: false })} </span>)}
                                        {product?.discount_amount > 0 && (
                                          <span className='DiscountPriceRound demi-bold'>
                                            {product?.discount_type == 'flat' ? `${product?.discount_amount} FLAT OFF` : ''}
                                            {product?.discount_type == 'percentage' ? `${product?.discount_amount}% OFF` : ''}
                                          </span>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                  {/* <div className="BestSeller demi-bold">BESTSELLER</div> */}
                                </Link>
                              </div>
                            </div>
                          ))}
                        </>
                      ) : (
                        <div className="ProductListEmptyView layout">
                          <div className="layout flex column align-center empty-inner">
                            <h3 className="bold text-center">We are Sorry!</h3>
                            <p className="text-center p2">We couldn’t find anything matching your search criteria.</p>
                            <p className="text-center p2">Please try resetting the filters again</p>
                            <button
                              type="button"
                              className="EmptyActionBtn demi-bold"
                              onClick={clearAllHeaderFilters}
                            >
                              CLEAR FILTERS
                            </button>
                            <div className="EmptyPromoCard">
                              <div className="EmptyPromoCardContent">
                                <div className="p3 demi-bold">Something New!</div>
                                <div className="p4">Get the newest pieces in your size from our latest drops.</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Footer />
          <LoginModal showModal={modalShow} modalHide={modalHide} />
        </div>
      </>
    )
  );
}

export default Category;