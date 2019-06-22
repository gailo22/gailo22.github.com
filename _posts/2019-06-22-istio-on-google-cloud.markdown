---
layout: post
title: "Istio on google cloud"
date: 2019-06-22 14:11:04 +0800
comments: true
categories: kubernetes cluster istio google cloud
---
This post I want to try setup istio on gogle cloud. Initially I have tried on my local macbook using minikube but not success because of slow and low memory. So let's try it on the real google cloud.

### Setup and Installation
- [Google cloud SDK](https://cloud.google.com/sdk/)
- Register google cloud account
- Create a new project `gailo22-hello-istio`
- [Download the Istio release](https://istio.io/docs/setup/kubernetes/#downloading-the-release)

```
$ gcloud container clusters create istio-cluster \                      
  --cluster-version latest \
  --num-nodes 4 \
  --zone asia-southeast1-b \
  --project gailo22-hello-istio

$ gcloud container clusters get-credentials istio-cluster \
    --zone asia-southeast1-b \
    --project gailo22-hello-istio

$ kubectl create clusterrolebinding cluster-admin-binding \
    --clusterrole=cluster-admin \
    --user=$(gcloud config get-value core/account) 
```

Afer download and extract the istio. Go to `istio-1.2.0`.
```
$ for i in install/kubernetes/helm/istio-init/files/crd*yaml; do kubectl apply -f $i; done

$ kubectl apply -f install/kubernetes/istio-demo.yaml

$ kubectl get svc -n istio-system

NAME                     TYPE           CLUSTER-IP    EXTERNAL-IP   PORT(S)               AGE
grafana                  ClusterIP      10.0.11.104   <none>        3000/TCP              44s
istio-citadel            ClusterIP      10.0.6.4      <none>        8060/TCP,15014/TCP     43s
istio-egressgateway      ClusterIP      10.0.1.220    <none>        80/TCP,443/TCP,15443/TCP  44s
istio-galley             ClusterIP      10.0.15.234   <none>        443/TCP,15014/TCP,9901/TCP  44s
istio-ingressgateway     LoadBalancer   10.0.14.1     <pending>     15020:30958/TCP,80:31380/TCP,443:31390/TCP,31400:31400/TCP,15029:31070/TCP,15030:32160/TCP,15031:31623/TCP,15032:32522/TCP,15443:31801/TCP   44s
istio-pilot              ClusterIP      10.0.0.255    <none>        15010/TCP,15011/TCP,8080/TCP,15014/TCP 44s
istio-policy             ClusterIP      10.0.5.110    <none>        9091/TCP,15004/TCP,15014/TCP 44s
istio-sidecar-injector   ClusterIP      10.0.9.235    <none>        443/TCP                      43s
istio-telemetry          ClusterIP      10.0.12.102   <none>        9091/TCP,15004/TCP,15014/TCP,42422/TCP 44s
jaeger-agent             ClusterIP      None          <none>        5775/UDP,6831/UDP,6832/UDP  40s
jaeger-collector         ClusterIP      10.0.9.157    <none>        14267/TCP,14268/TCP        40s
jaeger-query             ClusterIP      10.0.7.9      <none>        16686/TCP                  40s
kiali                    ClusterIP      10.0.14.237   <none>        20001/TCP                  44s
prometheus               ClusterIP      10.0.3.129    <none>        9090/TCP                   43s
tracing                  ClusterIP      10.0.6.128    <none>        80/TCP                     40s
zipkin                   ClusterIP      10.0.9.33     <none>        9411/TCP                   40s

$ kubectl get pods -n istio-system

NAME                                     READY     STATUS    RESTARTS   AGE
grafana-97fb6966d-2fxtf                  1/1       Running   0          4m
istio-citadel-7b4c85c7d6-9rfvf           1/1       Running   0          4m
istio-egressgateway-5f7fb656b9-4wkb8     1/1       Running   0          4m
istio-galley-56bbfd48dd-glh88            1/1       Running   0          4m
istio-ingressgateway-75b84dd8bf-k9nxf    1/1       Running   0          4m
istio-pilot-84f5c6c84b-nnmg7             2/2       Running   0          4m
istio-policy-7bf479465d-grlp2            2/2       Running   3          4m
istio-sidecar-injector-fc6b697bf-66c4w   1/1       Running   0          4m
istio-telemetry-6c7486df9f-cb5sb         2/2       Running   2          4m
istio-tracing-595796cf54-7blxt           1/1       Running   0          4m
kiali-55fcfc86cc-b6tzz                   1/1       Running   0          4m
prometheus-5679cb4dcd-kskpc              1/1       Running   0          4m
```

### Deploy your application
Look like our services are up and running now. Let's try deploy sample application on our cluster.
```
$ kubectl label namespace default istio-injection=enabled

$ kubectl apply -f samples/bookinfo/platform/kube/bookinfo.yaml

$ kubectl get services
NAME          TYPE        CLUSTER-IP   EXTERNAL-IP   PORT(S)    AGE
details       ClusterIP   10.0.3.54    <none>        9080/TCP   36s
kubernetes    ClusterIP   10.0.0.1     <none>        443/TCP    36m
productpage   ClusterIP   10.0.8.56    <none>        9080/TCP   34s
ratings       ClusterIP   10.0.7.170   <none>        9080/TCP   36s
reviews       ClusterIP   10.0.5.165   <none>        9080/TCP   35s

$ kubectl get pods
NAME                              READY     STATUS    RESTARTS   AGE
details-v1-7964b4bb49-fhcpm       2/2       Running   0          1m
productpage-v1-6c668694dc-cd86n   2/2       Running   0          1m
ratings-v1-7bb4dbd557-lh97l       2/2       Running   0          1m
reviews-v1-597f899bf6-wjfhn       2/2       Running   0          1m
reviews-v2-664994896d-flprx       1/2       Running   0          1m
reviews-v3-fc984656d-ph2bn        2/2       Running   0          1m

$ kubectl exec -it $(kubectl get pod -l app=ratings -o jsonpath='{.items[0].metadata.name}') -c ratings -- curl productpage:9080/productpage | grep -o "<title>.*</title>"

<title>Simple Bookstore App</title>


$ kubectl apply -f samples/bookinfo/networking/bookinfo-gateway.yaml
gateway "bookinfo-gateway" created
virtualservice "bookinfo" created

$ kubectl get gateway
NAME               AGE
bookinfo-gateway   29s

$ kubectl get svc istio-ingressgateway -n istio-system
NAME                   TYPE           CLUSTER-IP   EXTERNAL-IP     PORT(S)                                                                                                                                      AGE
istio-ingressgateway   LoadBalancer   10.0.14.1    35.185.176.73   15020:30958/TCP,80:31380/TCP,443:31390/TCP,31400:31400/TCP,15029:31070/TCP,15030:32160/TCP,15031:31623/TCP,15032:32522/TCP,15443:31801/TCP   19m

$ export INGRESS_HOST=$(kubectl -n istio-system get service istio-ingressgateway -o jsonpath='{.status.loadBalancer.ingress[0].ip}')
$ export INGRESS_PORT=$(kubectl -n istio-system get service istio-ingressgateway -o jsonpath='{.spec.ports[?(@.name=="http2")].port}')
$ export SECURE_INGRESS_PORT=$(kubectl -n istio-system get service istio-ingressgateway -o jsonpath='{.spec.ports[?(@.name=="https")].port}')

$ export GATEWAY_URL=$INGRESS_HOST:$INGRESS_PORT

$ echo $GATEWAY_URL
35.185.176.73:80

$ curl -s http://${GATEWAY_URL}/productpage | grep -o "<title>.*</title>"
<title>Simple Bookstore App</title>

```

### Clean up
Time to clean it up.
```
$ samples/bookinfo/platform/kube/cleanup.sh
```


### Summary
This is a sample application running on google cloud with istio.

![Alt Text](/images/sample-istio-app.png)