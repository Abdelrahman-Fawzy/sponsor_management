import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Sponsor, SponsorContactOfficer } from 'src/app/models/sponsors';
import { SponsorsService } from 'src/app/services/sponsors.service';

@Component({
  selector: 'app-create-sponsor',
  templateUrl: './create-sponsor.component.html',
  styleUrls: ['./create-sponsor.component.scss']
})
export class CreateSponsorComponent implements OnInit {

  modalRef?: BsModalRef;
  config = {
    animated: true,
    class: 'modal-lg modal-dialog-centered'
  };

  sponsorFormGroup!: FormGroup
  sponsorOfficersFormGroup!: FormGroup
  sponsorsValues!: Sponsor
  sponsorsOfficersValues!: SponsorContactOfficer
  formSubmitted: boolean = false
  formValid: boolean = false
  officersFormSubmitted: boolean = false
  officersFormValid: boolean = false
  sponsorsOfficers: SponsorContactOfficer[] = []
  sponsorsList: any[] = []

  constructor(
    private modalService: BsModalService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private sponsorService: SponsorsService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.createForm()
    this.getSponsorsList()
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.config);
  }

  getSponsorsList() {
    this.sponsorService.getSponsorsList().subscribe(sponsors => {
      this.sponsorsList = sponsors.data as any
      console.log(this.sponsorsList);
    })
  }

  createForm() {
    this.sponsorFormGroup = this.fb.group({
      sponsor_name: ['', Validators.required],
      sponsor_type: ['', Validators.required],
      sponsor_ID: ['', [Validators.required, Validators.minLength(12), Validators.maxLength(12)]],
      phone: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(15), Validators.pattern('[0-9]*')]],
      address: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      postal_code: ['', Validators.required],
      max_limit: ['', Validators.required],
      financial_limit: ['', Validators.required],
      time_limit: ['', Validators.required],
      sponsor_contact_officer: [[]],
      // sponsor_contact_officer: [[], Validators.required],
    })

    this.sponsorOfficersFormGroup = this.fb.group({
      contact_officer_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(15), Validators.pattern('[0-9]*')]]
    })
  }

  get f() {
    return this.sponsorFormGroup.controls;
  }

  get oform() {
    return this.sponsorOfficersFormGroup.controls;
  }

  validateOfficersForm() {
    let emailIndex
    for (const item of this.sponsorsList) {
      console.log(`item`, item);
      emailIndex = item.contact_officers.findIndex((x: any) => {
        return x.email === this.sponsorsOfficersValues.email
      })
      if (emailIndex !== -1 ) break;
    }
    
    let phoneIndex
    for (const item of this.sponsorsList) {
      console.log(`item`, item);
      phoneIndex = item.contact_officers.findIndex((x: any) => {
        return x.phone === this.sponsorsOfficersValues.phone
      })
      if (phoneIndex !== -1 ) break;
    }

    console.log(`emailIndex`, emailIndex);
    console.log(`phoneIndex`, phoneIndex);
    console.log(`sponsorsOfficersValues`, this.sponsorsOfficersValues);

    if (
      !this.sponsorsOfficersValues.contact_officer_name ||
      !this.sponsorsOfficersValues.email ||
      !this.sponsorsOfficersValues.phone
    ) {
      this.toastr.error('تأكد من جميع البيانات المطلوبة')
      this.officersFormValid = false
    } else if (emailIndex !== -1) {
      this.toastr.error('هذا الايميل موجود مسبقا')
      this.officersFormValid = false
    } else if (phoneIndex !== -1) {
      this.toastr.error('هذا الهاتف موجود مسبقا')
      this.officersFormValid = false
    } else if (this.sponsorOfficersFormGroup.invalid) {
      this.toastr.error('هناك خطأ ما,, تأكد من جميع البيانات')
      this.officersFormValid = false
    } else {
      this.officersFormValid = true
    }
    return this.officersFormValid
  }

  checkIfEmailExist(itemsList: any, valuesList: any): any {
    itemsList.findIndex((item: any) => {
      console.log(`item`, item);
      return item.email == valuesList.email
    })
  }

  checkIfPhoneExist(itemsList: any, valuesList: any): any {
    itemsList.findIndex((item: any) => {
      console.log(`item`, item);
      return item.phone == valuesList.phone
    })
  }
  
  validateForm() {
    let emailIndex = this.sponsorsList.findIndex((item: any) => {
      return item.email == this.sponsorsValues.email
    })
    
    let phoneIndex = this.sponsorsList.findIndex((item: any) => {
      console.log(`item`, item);
      return item.phone == this.sponsorsValues.phone
    })
    if (
      !this.sponsorsValues.sponsor_name ||
      !this.sponsorsValues.sponsor_type ||
      !this.sponsorsValues.sponsor_ID ||
      !this.sponsorsValues.phone ||
      !this.sponsorsValues.address ||
      !this.sponsorsValues.email ||
      !this.sponsorsValues.postal_code ||
      !this.sponsorsValues.max_limit ||
      !this.sponsorsValues.financial_limit ||
      !this.sponsorsValues.time_limit
    ) {
      this.toastr.error('تأكد من جميع البيانات المطلوبة')
      this.formValid = false
    } else if (emailIndex !== -1) {
      this.toastr.error('هذا الايميل موجود مسبقا')
      this.formValid = false
    } else if (phoneIndex !== -1) {
      this.toastr.error('هذا الهاتف موجود مسبقا')
      this.formValid = false
    } else if (this.sponsorFormGroup.invalid) {
      this.toastr.error('هناك خطأ ما,, تأكد من جميع البيانات')
      this.formValid = false
    } else if (this.sponsorsOfficers.length == 0) {
      this.toastr.error('يجب إضافة contact officer')
      this.formValid = false
    } else {
      this.formValid = true
    }
    return this.formValid
  }

  saveOfficersForm() {
    this.sponsorsOfficersValues = this.sponsorOfficersFormGroup.value as SponsorContactOfficer
    console.log('officers values', this.sponsorsOfficersValues);
    this.officersFormSubmitted = true
    if (this.validateOfficersForm()) {
      this.sponsorsOfficers.push(this.sponsorsOfficersValues)
      this.sponsorOfficersFormGroup.reset()
      this.modalRef?.hide()
    }
    console.log('this.sponsorsOfficers', this.sponsorsOfficers);
    
  }

  deleteOfficer(index: any) {
    this.sponsorsOfficers.splice(index, 1)
  }

  save() {
    this.sponsorsValues = this.sponsorFormGroup.value as Sponsor
    console.log(`values`, this.sponsorsValues);
    this.formSubmitted = true

    let dataToSend = {
      sponsor_name: this.sponsorsValues.sponsor_name,
      sponsor_type: this.sponsorsValues.sponsor_type,
      sponsor_ID: this.sponsorsValues.sponsor_ID,
      phone: this.sponsorsValues.phone,
      address: this.sponsorsValues.address,
      email: this.sponsorsValues.email,
      postal_code: this.sponsorsValues.postal_code,
      max_limit: this.sponsorsValues.max_limit,
      financial_limit: this.sponsorsValues.financial_limit,
      time_limit: this.sponsorsValues.time_limit,
      sponsor_contact_officer: this.sponsorsOfficers
    } as Sponsor

    if (this.validateForm()) {
      this.sponsorService.createSponsor(dataToSend).subscribe(res => {
        console.log(`res`, res);
        this.toastr.success("Successfully created")
        this.router.navigateByUrl('/')
      }, err => {
        // this.toastr.error('حدث خطأ ما')
        for (const error in err.error.errors) {
          console.log(`${error}: ${err.error.errors[error]}`);
          this.toastr.error(err.error.errors[error])
        }
      })
    }
  }

}
