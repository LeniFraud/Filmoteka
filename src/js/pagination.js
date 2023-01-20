import Pagination from 'tui-pagination';
// import 'tui-pagination/dist/tui-pagination.css'; //fix now styles in html (added with <link>), so I can set my styles above it

const options = {
  totalItems: 100,
  itemsPerPage: 10,
  visiblePages: 5,
  page: 1,
  centerAlign: true,
};

const container = document.getElementById('tui-pagination-container');
const instance = new Pagination(container, options);

// console.log(instance.getCurrentPage());
