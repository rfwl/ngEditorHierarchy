
# What is ngEditorHierarchy
ngEditorHierarchy provides codes to build a hierachy of editor forms and grid views to perform CRUD operations for any complex Json objects. As Json objects can have child objects or arrays, the editor forms or grid views can pop-up its child ones, which can then do the same to an unlimited depth. 


# What ngEditorHierarchy can do for you
ngEditorHierarchy provides codes in serveral sample editor hierarchys. Suppose you are a developer, you can add or modify their fields to perform CRUD operation for your own json objects. Then you can integrate these editor forms or grid views into your application. Quite often, the CRUD operations are actually the major parts of your applications. In this way, ngEditorHierarchy can boost your productivity to another level.

# What are inside the Editor Hierarchy
The editor form is an Angular Reactive Form used for editing/creating/deleting a Json object. For presenting Json object array, currently, ngEditorHierarchy is using two types of grid views: Angular Grid from AgGrid, and PTable from PrimeNG. If a field is having an object value, an icon will be shown on the editor form and in the cells of the grid view, user can pop-up a child editor form by clicking the icon. If a field is having an array of objects as its value, there are also icons to bring out child grid views. Grid view has icon buttons in the first two columns to bring out editor form for the whole row object. Currently, it doesn't support cell editors.

# Sample editor hierarchys

### Sample 1
Sample 1 presents an editor hierarchy for objedct fields of all the simple data types in three levels of editor form and grid views. Either editor form or grid view can popup child editor form or grid view.
### Sample 2
Demostrate  to use all the arrat visual data types.
### Sample 3
Demostrate how to select values from predefined arrays.
### Sample 4
Demostrate an editor hierarchy to maintain a product list for a appliance shop
### Sample 5
Demostrate an editor hierarchy to manage coaching schools 
## Sample 6
Demostrate an editor hierarchy to manage a property list for real estate agency.

# Visual Data Types
To input or present value for a Json object field in the editor hierarchy, ngEditorHierarchy provide different ways based on its data type. These ways were called as Visual Data Types. They fall into one of the following four categories:  
### Simple
Field value were directly shown on grid views.  Different types of HTML input tag is used to input value on editor form.
### Array
Icon plus a count will be shown on the grid view. A custom form control will be used on editor form to allow user to input value into the array. 
For Array of Boolean, the custom form control is a special one and others will use a common one.
### Object and ArryObject
Icon will be shown on both editor form and the grid view to open child editor form or grid view resepctively.
### Long String 
The field's text can be of multiple lines and will not shown on the grid views. But on the Editor Form, there will be a HTML text-area tag to input text to the field.

# Selector
In addition to use keyboard to type value into object fields, the editor forms provide another way to input value - select a  value from a predefined array. If the field has a simple value, a signle value can be selected from the array. If the field has an array as its value, multiple values can be selected from the array. The editor forms will read the arrays from a fixed file: editor-hierarchy.constants.ts. You can add new arrays to this file and use their names in your editor forms to allow users to select values from them. 


# Technology
To perform CRUD operations, ngEditorHierarchy utilizes the following technology stack:

* [Angular](https://angular.dev)
* [NGRX](https://ngrx.io/)
* [Firestore](https://firebase.google.com/docs/firestore)
* [Angular Fire](https://github.com/angular/angularfire)
* [ngxBootstrap](https://valor-software.com/ngx-bootstrap/#/documentation)
* [AgGrid](https://www.ag-grid.com)
* [PrimeNG](https://primeng.org/)


LICENSE Copyright (c) Reserved

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.



