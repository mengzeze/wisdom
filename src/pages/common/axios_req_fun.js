import {myutils} from '@/pages/common/utils'
export function setContentTypeIfUnset(headers, value) {
  if (!myutils.isUndefined(headers) && myutils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

export function normalizeHeaderName(headers, normalizedName) {
  myutils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
}
