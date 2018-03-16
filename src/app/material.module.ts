import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule, MatAutocompleteModule, MatSelectModule, MatProgressSpinnerModule, MatSnackBarModule, MatProgressBarModule, MatDatepickerModule, MatCheckboxModule, MatNativeDateModule, MatSliderModule, MatChipsModule, MatTableModule, MatPaginatorModule, MatExpansionModule } from '@angular/material';
import { MatMenuModule } from '@angular/material/menu';
@NgModule({
    imports: [MatButtonModule, MatMenuModule, MatIconModule, MatFormFieldModule, MatInputModule, MatAutocompleteModule, MatSelectModule, MatProgressSpinnerModule, MatSnackBarModule, MatProgressBarModule, MatDatepickerModule, MatCheckboxModule, MatNativeDateModule, MatSliderModule, MatChipsModule, MatTableModule, MatPaginatorModule, MatExpansionModule],
    exports: [MatButtonModule, MatMenuModule, MatIconModule, MatFormFieldModule, MatInputModule, MatAutocompleteModule, MatSelectModule, MatProgressSpinnerModule, MatSnackBarModule, MatProgressBarModule, MatDatepickerModule, MatCheckboxModule, MatNativeDateModule, MatSliderModule, MatChipsModule, MatTableModule, MatPaginatorModule, MatExpansionModule],
})
export class MaterialModule { }
