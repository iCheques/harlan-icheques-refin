export default class FieldsCreator {
  constructor() {
    this.content = $('<div>').addClass('content serasa');
    this.container = $('<div>').addClass('container').append(this.content);
  }

  addItem(name, value) {
    const field = $('<div>').addClass('field');

    const $name = $('<div>').addClass('name').css({
      fontSize: '10px',
      fontWeight: 'bold',
    });

    const $value = $('<div>').addClass('value');

    field.append($name.text(name), $value.text(value));

    this.content.append(field);
  }

  element() {
    return this.container;
  }

  resetFields() {
    this.content = $('<div>').addClass('content');
    this.container = $('<div>').addClass('container').append(this.content);
  }
}
