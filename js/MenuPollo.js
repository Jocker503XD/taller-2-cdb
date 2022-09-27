function RedondeoDecimal(val, num) {
  num = num || 2;
  var str = "" + Math.round(parseFloat(val) * Math.pow(10, num));
  while (str.length <= num) {
    str = "0" + str;
  }
  var pt = str.length - num;
  return str.slice(0, pt) + "." + str.slice(pt);
}

function comboRadio(form, name) {
  var radios = form.elements[name];
  var val;
  for (var i = 0, len = radios.length; i < len; i++) {
    if (radios[i].checked == true) {
      val = radios[i].value;
      break;
    }
  }
  return val;
}

function complementoPrecio(e) {
  var form = this.form;
  var val = parseFloat(form.elements['tops_tot'].value);
  if (this.checked == true) {
    val += parseFloat(this.value);
  } else {
    val -= parseFloat(this.value);
  }

  form.elements['tops_tot'].value = RedondeoDecimal(val);
  ComboTotal(form);
}

function comboPrecio(e) {
  this.form.elements['sz_tot'].value = parseFloat(this.value);
  ComboTotal(this.form);
}

function ComboTotal(form) {
  var sz_tot = parseFloat(form.elements['sz_tot'].value);
  var tops_tot = parseFloat(form.elements['tops_tot'].value);
  form.elements['total'].value = RedondeoDecimal(sz_tot + tops_tot);
}

(function () {
  var form = document.getElementById('polloForm');
  var el = document.getElementById('complementoCombo');
  var tops = el.getElementsByTagName('input');
  for (var i = 0, len = tops.length; i < len; i++) {
    if (tops[i].type === 'checkbox') {
      tops[i].onclick = complementoPrecio;
    }
  }

  var sz = form.elements['size'];
  for (var i = 0, len = sz.length; i < len; i++) {
    sz[i].onclick = comboPrecio;
  }
  form.elements['sz_tot'].value = RedondeoDecimal(parseFloat(comboRadio(form, 'size')));
  ComboTotal(form);
})();
