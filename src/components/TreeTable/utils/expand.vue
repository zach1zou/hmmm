<script>
export default {
  name: "TableExpand",
  functional: true,
  props: {
    row: Object,
    render: Function,
    index: Number,
    column: {
      type: Object,
      default: null,
    },
  },
  // render函数
  // props 传入的值
  // ctx 上下文
  // params 对象
  render: (h, ctx) => {
    const params = {
      row: ctx.props.row,
      index: ctx.props.index,
    };
    if (ctx.props.column) params.column = ctx.props.column;
    return ctx.props.render(h, params);
  },
};
</script>
