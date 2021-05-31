/*
 * @Description:
 * @Autor: Alfred
 * @Date: 2021-05-31 16:31:12
 * @LastEditTime: 2021-05-31 16:31:21
 * @FilePath: \manager-admin\src\store\modules\tagViews\action-types.ts
 */
export enum TagsActionTypes {
  ACTION_ADD_VIEW = 'ACTION_ADD_VIEW',
  ACTION_ADD_VISITED_VIEW = 'ACTION_ADD_VISITED_VIEW',
  ACTION_DEL_VIEW = 'ACTION_DEL_VIEW',
  ACTION_DEL_OTHER_VIEW = 'ACTION_DEL_OTHER_VIEW',
  ACTION_DEL_CACHED_VIEW = 'ACTION_DEL_CACHED_VIEW',
  ACTION_OTHER_VIEWS = 'ACTION_OTHER_VIEWS',
  ACTION_DEL_ALL_VIEWS = 'ACTION_DEL_ALL_VIEWS',
  ACTION_DEL_ALL_CACHED_VIEWS = 'ACTION_DEL_ALL_CACHED_VIEWS',
  ACTION_UPDATE_VISITED_VIEW = 'ACTION_UPDATE_VISITED_VIEW',
}