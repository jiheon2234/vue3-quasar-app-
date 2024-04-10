import { useAuthStore } from 'src/stores/auth';
import { storeToRefs } from 'pinia';
import { ref, readonly } from 'vue';
import { watch } from 'vue';
import { addBookmark, hasBookmark, removeBookmark } from 'src/services/post';

export const useBookmark = (id, options) => {
  const { initialCount } = options || null;
  const { uid, isAuthenticated } = storeToRefs(useAuthStore());

  const isBookmark = ref(false);
  const bookmarkCount = ref(initialCount);
  const postId = ref(id);

  const initBookmark = async () => {
    if (isAuthenticated.value === false) {
      isBookmark.value = false;
      return;
    }
    const value = await hasBookmark(uid.value, postId.value);

    isBookmark.value = value;
  };

  const togglebookmark = async () => {
    if (isAuthenticated.value === false) {
      alert('로그인 후 이용 가능');
      return;
    }

    if (isBookmark.value) {
      await removeBookmark(uid.value, postId.value);
      bookmarkCount.value--;
    } else {
      await addBookmark(uid.value, postId.value);
      bookmarkCount.value++;
    }
    isBookmark.value = !isBookmark.value;
  };

  watch(isAuthenticated, () => initBookmark(), { immediate: true });

  return {
    isBookmark,
    bookmarkCount: readonly(bookmarkCount),
    updateBookmarkCount: count => (bookmarkCount.value = count),
    togglebookmark,
  };
};
