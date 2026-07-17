# Security Policy

## Supported Version

The application deployed from the latest commit on `main` is supported. Older deployments and forks are not maintained by this project.

## Reporting a Vulnerability

Do not disclose suspected vulnerabilities in a public issue. Use the repository's [private vulnerability reporting form](https://github.com/DoctorLai/markdown-html-converter/security/advisories/new) and include:

- A description of the issue and its impact.
- Reproduction steps or a minimal proof of concept.
- Affected browsers or environments.
- Any suggested remediation.

Maintainers aim to acknowledge reports within seven days. Confirmed issues will be addressed according to severity, and credit will be given when requested.

The live preview sanitizes generated HTML with DOMPurify before rendering it. Please report any sanitizer bypass or unexpected script execution privately.
