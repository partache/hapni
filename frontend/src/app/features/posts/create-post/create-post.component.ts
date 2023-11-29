import {Component} from '@angular/core';
import {AbstractControl, NonNullableFormBuilder, Validators} from "@angular/forms";
import {PostService} from "../post.service";
import {RoutingService} from "../../../shared/services/routing.service";
import {Features} from "../../../shared/models/features";
import {PostsStep} from "../../models/posts-step";
import {HttpErrorResponse} from "@angular/common/http";
import {LoginAsyncError, LoginAsyncErrors, validationMessage} from "../../../auth/models/login-async-error";
import {imageUrlValidator} from "../../../shared/util/image-validator";

@Component({
    selector: 'app-create-post',
    templateUrl: './create-post.component.html',
})
export class CreatePostComponent {

    postForm = this.fb.group({
        title: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
        description: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(200)]],
        imageUrl: ['', [Validators.required, imageUrlValidator]],
    });

    constructor(private fb: NonNullableFormBuilder, private post: PostService, private router: RoutingService) {
    }

    onSubmit() {
        this.postForm.markAllAsTouched();

        if (this.postForm.invalid) {
            return;
        }

        const {title, description, imageUrl} = this.postForm.getRawValue();

        // Call the service method to create a post
        this.post.createPost({title, description, imageUrl}).subscribe({
            next: (createdPost) => {
                this.router.navigateToStep(Features.POSTS, PostsStep.POST_DETAILS);
            },
            error: (err: HttpErrorResponse) => {
                this.setFormAsyncError(this.getHttpError(err));
            }
        });
    }

    private setFormAsyncError(error: LoginAsyncError) {
        this.postForm.setErrors(error);
    }

    private getHttpError(error: HttpErrorResponse): LoginAsyncError {
        switch (error.status) {
            default:
                return {unknownServerError: true}
        }
    }

    protected formControlHasErrors(control: AbstractControl) {
        return Object.values(LoginAsyncErrors).find(v => control.hasError(v as string))
    }

    protected minMaxLengthValidationMessage() {
        if (this.postForm.hasError('minlength')) {
            return validationMessage(LoginAsyncErrors.minLength) + this.postForm.errors?.['minlength'];
        }
        if (this.postForm.hasError('maxlength')) {
            return validationMessage(LoginAsyncErrors.minLength) + this.postForm.errors?.['maxlength'];
        }

        return '';
    }

    protected imageValidationMessage() {
        if (this.postForm.hasError('invalidImageUrl')) {
            return validationMessage(LoginAsyncErrors.invalidImageUrl);
        }

        return '';
    }
}
