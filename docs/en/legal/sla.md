# Service Level Agreement (SLA)

Effective Date: August 28, 2026

This Service Level Agreement (SLA) describes the availability target, measurement method, exclusions, and service credits applicable to eligible OmniRouters API gateway and model routing services. It supplements the [Terms of Service](/legal/terms) and [Billing and Refund Policy](/legal/billing-refund).

## 1. Scope

1. This SLA applies only to the API access, authentication, request routing, and platform infrastructure under OmniRouters' control. Unless expressly stated on a product page, order, or written agreement, it does not apply to free trials, gifted credits, test environments, personal non-commercial use, or accounts that have been restricted, suspended, or terminated.
2. This SLA does not separately guarantee the availability of upstream model providers, output quality, content moderation decisions, generation time, network transmission, or third-party services. When an upstream model is unavailable, OmniRouters may return an error, switch providers, or route to another available model, but does not guarantee that a switch will succeed.
3. A “fault object” is a specific API service or agreed service item. Different models, routes, or service items may be measured separately according to the applicable order and technical records.

## 2. Definitions and Measurement

### 2.1 Service Period

A service period is one calendar month. A period shorter than a full calendar month is measured by the actual number of days in effect, unless an order or written agreement states otherwise.

### 2.2 Unavailability

“Unavailability” means that, within OmniRouters' control, the platform cannot receive and process compliant valid API requests for five consecutive minutes or longer, or continuously returns HTTP 5xx errors caused by a platform-side internal failure. Brief, intermittent, or sub-five-minute issues are excluded, although we will use reasonable efforts to identify their continuous impact from monitoring and logs.

### 2.3 Valid Request

A valid request is sent from a normally operating customer application to an enabled service with sufficient balance or quota and valid authentication, complies with the documentation and applicable model protocol, and is not rejected by content safety or risk controls. Authentication failures, insufficient balance, invalid parameters, quota exhaustion, policy violations, malicious or anomalous traffic, and requests that fail to reach the platform due to customer or third-party causes are not valid requests.

### 2.4 Availability Calculation

Availability = (total minutes in the service period - unavailable minutes) / total minutes in the service period × 100%

When multiple fault objects are unavailable during the same period, each may be measured separately, but the same customer impact in the same period will not be counted twice for the same platform event.

## 3. Availability Target

For services covered by this SLA, OmniRouters targets monthly availability of **at least 99.00%** for the API gateway and platform-side request processing. This is an availability target; it does not guarantee successful model output, expected results, or any particular latency.

## 4. Exclusions

The following do not count as unavailability:

1. Scheduled maintenance, upgrades, migrations, architecture changes, or emergency security maintenance;
2. Force majeure, natural disasters, war, civil unrest, public network failures, or government or regulatory action;
3. Failures of upstream model providers, cloud providers, payment processors, network operators, or other third parties;
4. Failures caused by the customer's application, network, device, DNS, proxy, configuration, credentials, request format, or integration code;
5. Insufficient balance, exhausted quota, authentication failure, violation of law or policy, security or risk controls, or lawful restriction, suspension, or termination of service;
6. Attacks, abuse, anomalous traffic, scraping, credential attacks, DDoS, or other conduct requiring protective measures;
7. Content rejected by safety controls, model-specific throttling, or model input/output and context limits;
8. Use that does not comply with documentation, an order, or an agreed technical requirement;
9. Brief or intermittent issues lasting less than five minutes, or impact that cannot be reasonably confirmed using logs and monitoring.

## 5. Monitoring and Incident Handling

OmniRouters uses platform monitoring, gateway logs, request records, and support tickets as the primary basis for measurement. Customers should contact `support@omnirouters.com` promptly after discovering an issue and provide the account identifier, request ID, date and time with time zone, route, error message, and sanitized logs. Do not provide the full value of an API key or sensitive content.

We may use alerts, traffic adjustments, failover, risk-traffic restrictions, remediation, or other reasonable measures based on impact. Resolution time depends on the cause, scope, and third-party cooperation; this SLA does not provide a fixed restoration-time commitment.

## 6. Service Credits

1. A customer who believes availability fell below the target may submit a service-credit request within 30 days after the relevant service period ends. The request should identify the service period, fault object, affected time, request IDs or ticket numbers, and supporting evidence.
2. After confirming platform-side responsibility, we may provide service credits or another reasonable remedy to eligible paid accounts based on the actual shortfall. Credits will generally not exceed the fees actually paid for the affected service during the relevant service period. Free, refunded, or gifted credits and losses caused by the customer or third parties are excluded from the credit basis.
3. A service-credit request does not limit our right to take security, compliance, risk-control, or account-enforcement measures under the Terms of Service. A single failed request, an unverified monitoring screenshot, or an upstream model incident does not by itself establish an SLA breach.
4. Unless mandatory law or a written agreement provides otherwise, service credits are the customer's sole remedy for failure to meet this SLA.

## 7. Updates

We may update this SLA to reflect changes in product architecture, upstream services, operational capabilities, or business arrangements. The updated version will be published on the website or in the documentation and will apply from its stated effective date. Unless required by law or a written agreement, incidents are handled under the version in effect when they occurred.

