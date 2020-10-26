
export default {
  'loadmore': {
    bind (el, binding) {
      el.addEventListener('scroll', function () {
        const scrollDistance = this.scrollHeight - this.scrollTop - this.clientHeight
        scrollDistance <1 && binding.value(binding.arg)
      })
    }
  },


}

