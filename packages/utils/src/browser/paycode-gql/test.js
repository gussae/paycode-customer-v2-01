async function test() {
  const mimetype = 'text/plain';
  const content = 'Hello World';
  const signedUrl = `https://paycode-customer-v2-document-store153324-dev.s3.us-west-2.amazonaws.com/behailu.yilma%40gmail.com/test/documents/test.txt?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZQRHMALQJKFBIKVF%2F20240327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20240327T013647Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIAwNEgcxbMbm2Uj9u5qb%2FvqxVrsJo8UczUgBXWHADXjOAiBUFQO4oZNUxY3AJChVNNewCYzqOtBTjcxYWloYwSwL7SqBAwiz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAEaDDY1Mzk5MTM0NjkxMiIMOGEXyH%2FkiMZrXy8vKtUCU1uomxk0kj3I9KCx3%2Fyacw7gui11zHZPynk46gMm5Dcs31ijO%2FiHWJ9F%2B7BADpsBwHsq%2FFCd7cxMzQ5ZoJZkuTP2LEAqmD9TI6%2BdAEEN4bqcXNH9%2BY%2FY%2BEaf3I8BWzT9BDFjj93%2Fu%2BdNsyx%2BHlMV2nNK7AsmrCP77gsXF1pC64hcN6%2FtU4x%2BqotkKFh3G8dyBnjMH7FS7HdDawrfA9N4pg7QkgToOdBkle1UOmKomVugrlWTp5zqXKyMWDmxC7F7J5m9YSFmKVQb%2Bu2zmrC5vaVnjaeNeMl2OsP4zOi9aXwiUo5TA8NKpcR3IThQqJh8IxZCgKm3ghYrd4pHPNHtIeSlwkVh6YA%2FiufYu%2B7l54hTMgHWb3rdO2P7okkS1rwuLRBv3SNaHzKEBPLQvDOVtJIgVm9Cr%2FJhseX8SYg2e9AGDBWNmDWiSMuJZWGEfSlCEznbojEwvu%2BNsAY6nwGZqGUM%2BjCMtXIes%2BhHo84iVv48srj%2FnQL97%2BmuUfaDoSMMomyB1xntmN%2FWDNsadkGPzg0%2BO67CWO2YIqKO1uaTFr3VXigDeFAgYiPVYxcJwo7%2BUjFPArZiPtlQIds5nojhBHXKOk2EMQepEmSsmyQvt52KbuGlkUJXiF%2B%2FKjoroxj2heYGGTyeDlLj%2BkRYccL%2Bv7IL0LPDNgzXHWr%2BhoY%3D&X-Amz-Signature=2f45962c4802225af7e3137532a3eb91e3e923d8b0a4c0d067544396ecdeeecd&X-Amz-SignedHeaders=host&x-amz-meta-dirname=test%2Fdocuments&x-amz-meta-entity-type=DOCUMENT&x-amz-meta-filename=test.txt&x-amz-meta-mimetype=text%2Fplain&x-amz-meta-username=behailu.yilma%40gmail.com&x-id=PutObject`;
  const metadataHeaders = "{\"mimetype\":\"text/plain\",\"dirname\":\"test/documents\",\"filename\":\"test.txt\",\"entity-type\":\"DOCUMENT\",\"username\":\"behailu.yilma@gmail.com\"}"

  return await fetch(signedUrl, {
    method: 'PUT',
    headers: {
      ...JSON.parse(metadataHeaders),
      'Content-Type': mimetype,
    },
    body: content,

  });
}


test().then(console.log).catch(console.error)