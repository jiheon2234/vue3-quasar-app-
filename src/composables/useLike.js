import { useAuthStore } from 'src/stores/auth';
import { storeToRefs } from 'pinia';
import { ref, readonly } from 'vue';
import { watch } from 'vue';
import { addLike, hasLike, removeLike } from 'src/services/post';

export const useLike = (id, options) => {
  const { initialCount } = options || null;
  const { uid, isAuthenticated } = storeToRefs(useAuthStore());

  const isLike = ref(false);
  const likeCount = ref(initialCount);
  const postId = ref(id);

  const initLike = async () => {
    if (isAuthenticated.value === false) {
      isLike.value = false;
      return;
    }
    const value = await hasLike(uid.value, postId.value);

    isLike.value = value;
  };

  const togglelike = async () => {
    if (isAuthenticated.value === false) {
      alert('로그인 후 이용 가능');
      return;
    }
    debugger;
    if (isLike.value) {
      await removeLike(uid.value, postId.value);
      likeCount.value--;
    } else {
      await addLike(uid.value, postId.value);
      likeCount.value++;
    }
    isLike.value = !isLike.value;
  };

  watch(isAuthenticated, () => initLike(), { immediate: true });

  return {
    isLike,
    likeCount: readonly(likeCount),
    updateLikeCount: count => (likeCount.value = count),
    togglelike,
  };
};
