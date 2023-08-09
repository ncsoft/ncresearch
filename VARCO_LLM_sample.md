VARCO-LLM is NCSOFT’s large language model, which can be applied to develop various NLP-based AI services such as Q&A, chatbot, summarization, information extraction etc. VACRO-LLM, trained with public pre-training data and internally constructed high-quality Korean data, boasts the highest performance among the Korean LLMs of similar sizes that have been released to date (see https://ncsoft.github.io/ncresearch/ for evaluation results). Our models will continue to be updated and we will also release LLMs that support multiple languages or are fined-tuned to specific tasks. As VARCO-LLM is currently in beta service (10 Aug to 10 Sep 2023), usage fees will not be charged temporally for this period. For inquiries regarding further performance improvement or collaboration for service applications, please contact us via email (varco_llm@ncsoft.com).

This sample notebook shows you how to deploy [varco llm](https://aws.amazon.com/marketplace/pp/prodview-aout3755izrye) using Amazon SageMaker.

> **Note**: This is a reference notebook and it cannot run unless you make changes suggested in the notebook.


# Pre-requisites:

1. **Note**: This notebook contains elements which render correctly in Jupyter interface. Open this notebook from an Amazon SageMaker Notebook Instance or Amazon SageMaker Studio.  
2. Ensure that IAM role used has **AmazonSageMakerFullAccess**  
3. To deploy this ML model successfully, ensure that:  
    a. Either your IAM role has these three permissions and you have authority to make AWS Marketplace subscriptions in the AWS account used:  
        i. aws-marketplace:ViewSubscriptions  
        ii. aws-marketplace:Unsubscribe  
        iii. aws-marketplace:Subscribe  


# Contents:

1. [Subscribe to the model package](https://oregon-notebook-cboy.notebook.us-west-2.sagemaker.aws/lab/tree/varco_model.ipynb#1.-Subscribe-to-the-model-package)  
2. [Create an endpoint and perform real-time inference](https://oregon-notebook-cboy.notebook.us-west-2.sagemaker.aws/lab/tree/varco_model.ipynb#2.-Create-an-endpoint-and-perform-real-time-inference)  
    a. [Create an endpoint](https://oregon-notebook-cboy.notebook.us-west-2.sagemaker.aws/lab/tree/varco_model.ipynb#A.-Create-an-endpoint)  
    b. [Create input payload](https://oregon-notebook-cboy.notebook.us-west-2.sagemaker.aws/lab/tree/varco_model.ipynb#B.-Create-input-payload)  
    c. [Perform real-time inference](https://oregon-notebook-cboy.notebook.us-west-2.sagemaker.aws/lab/tree/varco_model.ipynb#C.-Perform-real-time-inference)  
    d. [Visualize output](https://oregon-notebook-cboy.notebook.us-west-2.sagemaker.aws/lab/tree/varco_model.ipynb#D.-Visualize-output)  
    e. [Delete the endpoint](https://oregon-notebook-cboy.notebook.us-west-2.sagemaker.aws/lab/tree/varco_model.ipynb#E.-Delete-the-endpoint)  
3. [Perform batch inference](https://oregon-notebook-cboy.notebook.us-west-2.sagemaker.aws/lab/tree/varco_model.ipynb#3.-Perform-batch-inference)  
4. [Clean-up](https://oregon-notebook-cboy.notebook.us-west-2.sagemaker.aws/lab/tree/varco_model.ipynb#4.-Clean-up)  
    a. [Delete the model](https://oregon-notebook-cboy.notebook.us-west-2.sagemaker.aws/lab/tree/varco_model.ipynb#A.-Delete-the-model)  
    b. [Unsubscribe to the listing (optional)](https://oregon-notebook-cboy.notebook.us-west-2.sagemaker.aws/lab/tree/varco_model.ipynb#B.-Unsubscribe-to-the-listing-(optional))  


# Usage instructions

You can run this notebook one cell at a time (By using Shift+Enter for running a cell).

```python
import base64
import json
import uuid
from sagemaker import ModelPackage
import sagemaker as sage
from sagemaker import get_execution_role
from sagemaker import ModelPackage
import boto3
from IPython.display import Image
from PIL import Image as ImageEdit
import numpy as np
 
# 1. model arn from marketplace model package
model_package_arn = "arn:aws:sagemaker:us-east-1:973735099617:model-package/ncsoft-varco-1-5b-fm-final"
 
 
# sagemaker session & bucket settings
role = get_execution_role()
sagemaker_session = sage.Session()
bucket = sagemaker_session.default_bucket()
runtime = boto3.client("runtime.sagemaker")
 
 
# model info from marketplace model package
model_name = "varco-llm-model"
content_type = "application/json"
real_time_inference_instance_type = (
    "ml.g5.xlarge"
)
batch_transform_inference_instance_type = (
    "ml.g4dn.xlarge"
)
 
# 2. create a deployable model from the model package.
model = ModelPackage(
    role=role, model_package_arn=model_package_arn, sagemaker_session=sagemaker_session
)
 
# Deploy the model
predictor = model.deploy(1, real_time_inference_instance_type, endpoint_name=model_name)
 
 
# 3. Invoke endpoint(inference) & get result
input = {"text":"안녕"}
 
response = runtime.invoke_endpoint(
    EndpointName=model_name,
    ContentType=content_type,
    Accept="application/json",
    Body=json.dumps(input),
)
 
json.load(response["Body"])
 
# 4. Delete resources
model.sagemaker_session.delete_endpoint(model_name)
model.sagemaker_session.delete_endpoint_config(model_name)
 
model.delete_model()
```