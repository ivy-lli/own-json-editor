import { JSONEditor } from "@json-editor/json-editor";
import { editors } from '@json-editor/json-editor/src/editors/index.js'
import { SelectEditor } from "@json-editor/json-editor/src/editors/select";

function createEditor(data) {
  const element = document.querySelector('.editor');

  console.log(element);
  const editor = new JSONEditor(element, data);
  editor.on('ready',() => {
    editor.setValue(data.config);
    editor.validate();
  });
}

async function fetchConfig(configUri) {
  const response = await fetch(configUri);
  const json = await response.json();
  return json
}

async function fetchDialogs(configUri) {
  const response = await fetch(configUri+'/dialogIds');
  const json = await response.json();
  console.log("received "+JSON.stringify(json))
  return json
}

async function filterDialogs(editor, input) {
  console.log("input "+input)
  if (input.length < 1) { return [] }

  var result = await fetchDialogs(getConfigUrl())
  return result.dialogIds.filter(dialog => {
    return dialog.toLowerCase().includes(input.toLowerCase())
  })
}

function getConfigUrl() {
  const params = new URLSearchParams(window.location.search);
  const pid = params.get("pid");
  console.log("piiiid " + pid);
  
  return 'http://localhost:8081/designer/api/config/'+pid
}


fetchConfig(getConfigUrl()).then(result => createEditor(result));

console.log('bla');

JSONEditor.defaults.callbacks = {
  'autocomplete': {
    'selectDialog': filterDialogs
  }
}

class DialogIdEditor extends SelectEditor {
  preBuild () {
    this.input_type = 'select'
    this.enum_display = []
    this.enum_options = []
    this.enum_values = []
  }

  afterInputReady () {
    fetchDialogs(getConfigUrl()).then(result => {
      const options = result.dialogIds;
      this.theme.setSelectOptions(this.input, options, options)
    });
    super.afterInputReady()
  }

  build() {
    console.log("dialogid editor");
    super.build();
  }
}

Object.assign(JSONEditor.defaults.editors, {...editors, DialogIdEditor})
JSONEditor.defaults.resolvers.unshift(schema => schema.type==='string' && schema.format==='dialogid' && 'DialogIdEditor');
