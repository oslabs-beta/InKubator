
<h2>InKubator - Easy Kubernetes Deployment Tool</h2>

<img width="1356" alt="Screenshot 2023-10-30 at 4 57 24 PM" src="https://github.com/oslabs-beta/InKubator/assets/140859521/9f09af02-89b9-4493-9d7f-2dfa318634cd">

<h2>Tech Stack</h2>

<img width="692" alt="Screenshot 2023-10-31 at 4 38 59 PM" src="https://github.com/oslabs-beta/InKubator/assets/140859521/cfda02f2-007a-40eb-805c-5cabebab7baf">


<h2>What is Kubernetes?</h2>
<p>
  In the realm of traditional infrastructure, each application typically operates on a single physical server. However, the landscape of modern application architecture is significantly more intricate. Web applications now come bundled in containers, which are self-contained packages comprising segments of an application and all the necessary dependencies. This innovative approach poses a challenge for operational teams, as they are tasked with scheduling, deploying, automating, and scaling dozens or even hundreds of containers.
  Kubernetes, also known as K8s, is an open-source system for automating deployment, scaling, and management of containerized applications. Kubernetes enhances reliability and minimizes the time and resources required for daily operations. Kubernetes also offers storage provisions, load balancing, autoscaling and self-healing.
</p>
<p>
  The fundamental elements of Kubernetes architecture are clusters. Each cluster is composed of nodes, each of which represents a single compute host (virtual or physical machine). Each cluster comprises a master node (also known as control plane) which makes global decisions about the entire cluster, along with multiple worker nodes that handle containerized applications. Here is an illustration of a simplified version of Kubernetes components.</p>
  <img width="500" alt="Screenshot 2023-10-30 at 2 52 31 PM" src="https://github.com/oslabs-beta/InKubator/assets/140859521/f8d3b5d5-5d6e-4baf-90a7-2be2aab65b7b">
<p>
  However, both the master node and worker node are considerably more complex systems, each incorporating multiple components and processes that operate within them. The components of the master node include the API server, etcd, kube-scheduler, kube-controller-manager, and kube-cloud-manager. Each worker node encompasses a variety of components: kubelet, kube-proxy, container runtime. Additionally, various addons, such as container resource monitoring, network plugins, and web user interfaces, further enhance the capabilities of Kubernetes. </p>
  
<img width="600" alt="Screenshot 2023-10-30 at 2 48 52 PM" src="https://github.com/oslabs-beta/InKubator/assets/140859521/0eafbd00-7859-4613-9c02-13f50105cf39">
  <p>
  When user creates an object in Kubernetes, they must provide the object spec that describes its desired state, as well as some basic information about the object. Most often this information is provided to Kubernetes CLI in the file know as deployment manifrst. YAML is a language used to provide configuration for Kubernetes. 
</p>

<h2>What is InKubator?</h2>
<p>Understanding Kubernetes architecture can be complex, and the process of deploying a cluster is not always straightforward. Even minor syntax errors or incorrect indentation of YAML manifrst can significantly complicate the deployment process, especially for those new to Kubernetes. InKubator is a developer tool designed to simplify YAML generation and cluster deployment. It enables users to deploy clusters locally on their machines using Minikube or in the cloud with the Google Kubernetes Engine (GKE).
</p>
<h2>To Get Started</h2>
InKubator requires you to have <a href="https://docs.docker.com/get-docker/">Docker</a> installed on your machine. Please dowload and install the appropriate version for your operating system.
<h4>Minikube</h4>
<p>
 To test InKubator using minikube, ensure that your machine meets the following requirements: 2 CPU or more, 2GB of free memory, 20GB of free disk space, and an active internet connection. If you haven't already, please install <a href="https://minikube.sigs.k8s.io/docs/start/">Minikube</a> on your machine. Alternatively, you can install the latest minikube stable release on x86-64 macOS using binary download:
<code>
curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-darwin-amd64
sudo install minikube-darwin-amd64 /usr/local/bin/minikube
</code>
</p>
<p>
Once installed, start minikube in your terminal:
<code>minikube start</code>
and navigate to <a href="https://splash.inkubator.app/">InKubator</a>.
InKubator enables you to deploy your containerized app effortlessly, requiring only your public image. Alternatively, you can utilize a sample app provided by InKubator to test Kubernetes deployment.
</p>
<h4>Cloud Deployment</h4>
<p>Before deploying on Google Cloud, ensure that the <a href="https://cloud.google.com/sdk/docs/install">gloud CLI</a> is installed on your machine. Additionally, you will need to manage authentication between the client and Google Kubernetes Engine. Run <code>gke-gcloud-auth-plugin</code> or click <a href="https://cloud.google.com/blog/products/containers-kubernetes/kubectl-auth-changes-in-gke">here</a> for more information.
</p>
<h2>Features</h2>
<p>Let InKubator guide you through YAML configuration process. Just fill out a straightforward form, and it will generate the YAML manifest for you. Moreover, you can conveniently preview the YAML file before applying it. If you're considering deploying to Google Cloud, InKubator offers the option to either create a new cluster or utilize an existing one. Keep in mind that setting up a new cluster may take up to 10 minutes. Additionally, you have the flexibility to expose your application to external IP requests. Lastly, InKubator provides additional information on the clusters you just deployed, including the deployment name, image, replicas, pods, and pods health.
  </p>
  <p>
InKubator is currently offers a beta version. Our team is actively expanding InKubator, incorporating features such as multiple node deployment, visualization, and advanced monitoring capabilities. Stay tuned for the latest updates and developments!
</p>
<h2>Contributions</h2>
<p>
Contributions are the cornerstone of the Open Source Community, making it an incredible space for learning, development, and innovation. InKubator, as an Open Source project, eagerly welcomes contributions. Begin by forking the dev branch and creating a feature branch in your repository. Ensure that all pull requests originate from your feature branch and are directed to InKubator's dev branch. Feel free to open an issue as well!
  </p>
<h2>Publications</h2>
Read our Medium article <a href="">here</a>.
<h2>About the team</h2>
<table>
  <tr>
    <th>
      <img width="300" alt="Tarik Bensalem" src="https://github.com/oslabs-beta/InKubator/assets/140859521/0ba83b6a-9882-432b-b0f3-6dfa2c80c666">
    </th>
    <th>
      <img width="300" alt="Rita Bizhan" src="https://github.com/oslabs-beta/InKubator/assets/140859521/5e7867c1-b39d-477f-94d5-8eb434fb5175">
    </th> 
    <th>
       <img width="300" alt="Jeff Chan" src="https://github.com/oslabs-beta/InKubator/assets/140859521/db69e14a-759d-4357-b0f8-0dd1f32b8ad7">
    </th>
    <th>
      <img width="300" alt="Christina Flores" src="https://github.com/oslabs-beta/InKubator/assets/140859521/3e1f633a-0fa5-4c39-80f1-25d757a880af">
    </th>
  </tr>
  <tr>
    <td align="center">Tarik Bensalem</td>
    <td align="center">Rita Bizhan</td> 
    <td align="center">Jeff Chan</td>
    <td align="center">Cristina Flores</td>
  </tr>
  <tr>
    <td align="center"><a href="https://www.linkedin.com/in/tarik-bensalem/">
<img src="https://cdn1.iconfinder.com/data/icons/logotypes/32/circle-linkedin-1024.png" width="25" alt="LinkedIn"></a></td>
    <td align="center"><a href="https://www.linkedin.com/in/margarita-bizhan-0837a9171/">
<img src="https://cdn1.iconfinder.com/data/icons/logotypes/32/circle-linkedin-1024.png" width="25" alt="LinkedIn"></a></td> 
    <td align="center"><a href="https://www.linkedin.com/in/jeffnzk/">
<img src="https://cdn1.iconfinder.com/data/icons/logotypes/32/circle-linkedin-1024.png" width="25" alt="LinkedIn"></a></td>
    <td align="center"><a href="https://www.linkedin.com/in/cristina-flores-rodriguez/">
<img src="https://cdn1.iconfinder.com/data/icons/logotypes/32/circle-linkedin-1024.png" width="25" alt="LinkedIn"></a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/Tbensalem">
  <img src="https://www.iconsdb.com/icons/preview/white/github-11-xxl.png" width="25" alt="GitHub"></a></td>
    <td align="center"><a href="https://github.com/margaritabizhan">
  <img src="https://www.iconsdb.com/icons/preview/white/github-11-xxl.png" width="25" alt="GitHub"></a></td> 
    <td align="center">
<a href="https://github.com/jeffnzk">
  <img src="https://www.iconsdb.com/icons/preview/white/github-11-xxl.png" width="25" alt="GitHub"></a></td>
    <td align="center"><a href="https://github.com/mildwushroom">
  <img src="https://www.iconsdb.com/icons/preview/white/github-11-xxl.png" width="25" alt="GitHub"></a></td>
  </tr>
</table>



