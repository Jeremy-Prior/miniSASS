# Profile API

## Description

The User Profile API functions as an endpoint to update the user profile, password, and certificate.

## How to use

### current_domain: https://minisass.sta.do.kartoza.com/

### 1. https://{current_domain}/authentication/api/user/update/

This API only allows 2 methods:
1. GET
2. POST

#### GET
Used to get the User Profile detail including the uploaded certificate. No parameter is needed, since the endpoint automatically gets the 
profile based on the authenticated user. A success request will have the status code 200.
When using GET, the `old_password`, `password`, and `confirm_password` fields will always be empty.

Example response:
```typescript
{
    "username": "admin",
    "email": "admin@kartoza.com",
    "name": "Admin",
    "surname": "Name",
    "organisation_type": "Other",
    "organisation_name": "Kartoza",
    "country": "ZA",
    "old_password": "",
    "password": "",
    "confirm_password": "",
    "certificate": "/minio-media/demo/6/certificate.png",
}
```

#### POST
Used to update the User Profile detail, including the certificate upload. 
The accepted content type is multipart/form-data.

Here is an example to send the POST request.
```typescript
const URL = 'https://minisass.sta.do.kartoza.com/authentication/api/user/update/'l
const response = await axios.post(URL, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    }
});
```

The Form Data consists of 2 entries: `certificate` and `data`.

`certificate`: The uploaded certificate file. The value is taken from file input.

`data`: The JSON string representation of updated user profile.
If the original data is this:
```typescript
{
    "username": "admin",
    "name": "Admin",
    "surname": "Name",
    "email": "admin@kartoza.com",
    "country": "ZA",
    "password": "",
    "confirmPassword": "",
    "oldPassword": "",
    "updatePassword": false,
    "organisation_name": "Kartoza",
    "organisation_type": "Other",
}
```
Then it will be sent as this
```typescript
'{"username": "admin", "name": "Admin", "surname": "Name", "email": "admin@kartoza.com", "country": "ZA", "password": "", "confirmPassword": "", "oldPassword": "", "updatePassword":false, "organisation_name": "Kartoza", "organisation_type": "Other"}'
```


If updating profile/changing password/uploading certificate is successful, a response 200 will be returned
with the User Profile detail.
```typescript
{
    "username": "admin",
    "email": "admin@kartoza.com",
    "name": "Admin",
    "surname": "Name",
    "organisation_type": "Other",
    "organisation_name": "Kartoza",
    "country": "ZA",
    "old_password": "",
    "password": "",
    "confirm_password": "",
    "certificate": "/minio-media/demo/6/certificate.png",
}
```

####  Update Password
To update password, set `updatePassword` to `true`, then provide value in the `old_password`, `password`, 
and `confirm_password` fields.