export const useTag = options => {
  const { tags, updateTags, maxLengthMessage } = options || {};

  const addTag = newTag => {
    const isEventHandler = typeof newTag !== 'string';
    const tagValue = isEventHandler
      ? newTag.target.value.replace(/ /g, '')
      : newTag.replace(/ /g, '');

    if (!tagValue) return;
    if (tags.value.length >= 5) {
      $q.notify(maxLengthMessage || '태그는 5개까지만 등록할 수 있습니다.');
      return;
    }
    if (!tags.value.includes(tagValue)) {
      // emit('update:tags', [...props.tags, tagValue]);
      updateTags([...tags.value, tagValue]);
    }
    if (isEventHandler) {
      newTag.target.value = '';
    }
  };

  const removeTag = index => {
    const model = [...tags.value];
    model.splice(index, 1);
    // emit('update:tags', model);
    updateTags(model);
  };
  return { addTag, removeTag };
};
