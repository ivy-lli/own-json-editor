import { SelectEditor } from "@json-editor/json-editor/src/editors/select";
import { fetchDialogs, fetchDialogStartMethods } from "./api";

export class DialogIdEditor extends SelectEditor {
  preBuild () {
    this.input_type = 'select'
    this.enum_display = []
    this.enum_options = []
    this.enum_values = []
  }

  afterInputReady () {
    fetchDialogs().then(result => {
      const options = result.dialogIds;
      this.theme.setSelectOptions(this.input, options, options)
    });
    super.afterInputReady()
  }

  build() {
    super.build();
  }
}

export class StartMethodEditor extends DialogIdEditor {
  afterInputReady () {
    fetchDialogStartMethods().then(result => {
      const options = result;
      this.theme.setSelectOptions(this.input, options, options)
    });
    super.afterInputReady()
  }
}