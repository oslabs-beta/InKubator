# InKubator
InKubator - Easy Kubernetes Deployment Tool

<img width="1358" alt="Screenshot 2023-10-30 at 12 39 20 PM" src="https://github.com/oslabs-beta/InKubator/assets/140859521/5a16ee13-55e3-4f0f-a37c-d1a6751b0022">

<h2>What is Kubernetes?</h2>
<p>
  In the realm of traditional infrastructure, each application typically operates on a single physical server. However, the landscape of modern application architecture is significantly more intricate. Web applications now come bundled in containers, which are self-contained packages comprising segments of an application and all the necessary dependencies. This innovative approach poses a challenge for operational teams, as they are tasked with scheduling, deploying, automating, and scaling dozens or even hundreds of containers.
  Kubernetes, also known as K8s, is an open-source system for automating deployment, scaling, and management of containerized applications. Kubernetes enhances reliability and minimizes the time and resources required for daily operations. Kubernetes also offers storage provisions, load balancing, autoscaling and self-healing.
</p>
<p>
  The fundamental elements of Kubernetes architecture are clusters. Each cluster is composed of nodes, each of which represents a single compute host (virtual or physical machine). Each cluster comprises a master node (also known as control plane) which makes global decisions about the entire cluster, along with multiple worker nodes that handle containerized applications. Here is an illustration of a simplified version of Kubernetes components.
  <img width="500" alt="Screenshot 2023-10-30 at 2 52 31 PM" src="https://github.com/oslabs-beta/InKubator/assets/140859521/f8d3b5d5-5d6e-4baf-90a7-2be2aab65b7b">
</p>
<p>
  However, both the master node and worker node are considerably more complex systems, each incorporating multiple components and processes that operate within them. The components of the master node include the API server, etcd, kube-scheduler, kube-controller-manager, and kube-cloud-manager. Each worker node encompasses a variety of components: kubelet, kube-proxy, container runtime. Additionally, various addons, such as container resource monitoring, network plugins, and web user interfaces, further enhance the capabilities of Kubernetes.
<img width="600" alt="Screenshot 2023-10-30 at 2 48 52 PM" src="https://github.com/oslabs-beta/InKubator/assets/140859521/0eafbd00-7859-4613-9c02-13f50105cf39">
  When user creates an object in Kubernetes, they must provide the object spec that describes its desired state, as well as some basic information about the object. Most often this information is provided to Kubernetes CLI in the file know as deployment manifrst. YAML is a language used to provide configuration for Kubernetes. 
</p>

<h2>What is InKubator?</h2>
<p>Kubernetes architecture can be intricate and the process of cluster deployment is not always straight-forward. InKubator - a developer tool that simplifies YAML generation and cluster deployment. InKubator offers cluster deployment locally opn your machine using minimube or Cloud deployment on Google Kubernetes Engine (EKG).
</p>
<h2>To Get Started</h2>
This application requires you to have <a href="https://www.docker.com/products/docker-desktop/">Docker</a> installed on your machine. 
<h4>Minikube</h4>
<p>
  If you are testing InKubator using minikube, have minikube installed on your machine. 
</p>
